import { ethers } from 'ethers'
import { createContext, useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = createContext()

const ethereum = typeof window !== 'undefined' && window?.ethereum

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract
}
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
  const [transactions, setTransactions] = useState([])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask!')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransactions()
      } else {
        console.log('No accounts found!')
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object!')
    }
  }
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask!')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install metamask!')
      const transactionContract = getEthereumContract()
      const availableTransactions = await transactionContract.getAllTransactions()
      const modifiedTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18
      }))
      setTransactions(modifiedTransactions)
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask!')
      const { addressTo, amount, message, keyword } = formData
      const parsedAmount = ethers.utils.parseEther(amount)
      const transactionContract = getEthereumContract()
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', //21000GWEI
            value: parsedAmount._hex
          }
        ]
      })

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      )
      setIsLoading(true)
      console.log('Loading', transactionHash.hash)
      await transactionHash.wait()
      setIsLoading(false)
      console.log('Success', transactionHash.hash)
      const tcount = await transactionContract.getTransactionCount()
      setTransactionCount(tcount)
    } catch (error) {
      console.log(error)
      throw new Error('No etherum object!')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
