import Head from 'next/head'
import { useContext, useState } from 'react'
import Navbar from '../components/navbar'
import { TransactionContext } from '../context/TransactionContext'

export default function Home() {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } =
    useContext(TransactionContext)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData
    e.preventDefault()
    console.log('button click', addressTo)
    if (addressTo === '' || amount === '' || keyword === '' || message === '') return
    sendTransaction()
  }

  return (
    <div className='min-h-screen bg-gradient'>
      <Head>
        <title>DPay</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
      <main className='flex flex-col md:flex-row'>
        <div className='flex justify-center items-center md:w-1/2 py-auto'>
          <div className='flex flex-col justify-between w-80 h-44 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-2'>
            <div className='text-white flex items-center space-x-1.5'>
              <div className='h-10 w-10 rounded-full border-white border' />
              <p className='font-medium'>Ethereum</p>
            </div>
            <p className='text-white m-2'>Address</p>
          </div>
        </div>
        <div className='md:w-1/2 p-5 px-10'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col space-y-4 backdrop-blur-md bg-black/60 rounded-lg p-4 lg:px-10 lg:py-20'
          >
            <h1 className='text-center text-3xl text-white'>Send Money</h1>
            <input
              name='addressTo'
              type='text'
              className='outline-none p-2 rounded-lg bg-gray-200 text-black'
              placeholder='Address to'
              onChange={handleChange}
            />
            <input
              name='amount'
              type='number'
              step={0.00001}
              className='outline-none p-2 rounded-lg bg-gray-200 text-black'
              placeholder='Amount(ETH)'
              onChange={handleChange}
            />
            <input
              name='keyword'
              type='text'
              className='outline-none p-2 rounded-lg bg-gray-200 text-black'
              placeholder='Keyword(gif)'
              onChange={handleChange}
            />
            <input
              name='message'
              type='text'
              className='outline-none p-2 rounded-lg bg-gray-200 text-black'
              placeholder='message'
              onChange={handleChange}
            />
            <div className='bg-white h-[1px]' />
            {true ? (
              <button type='submit' className='bg-black text-white p-2 rounded-lg'>
                Send Now
              </button>
            ) : (
              <div className='mx-auto w-20 h-20 border-l rounded-full animate-spin'></div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
