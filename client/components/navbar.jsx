const Navbar = ({ connectWallet, currentAccount }) => {
  return (
    <nav className='flex w-full justify-between p-5 md:px-16 text-white'>
      <h1 className='font-semibold text-2xl'>
        <span className='font-bold text-3xl'>D</span>pay
      </h1>
      {!currentAccount ? (
        <button onClick={connectWallet} className='bg-black p-2 font-medium px-4 rounded-full'>
          Connect to wallet
        </button>
      ) : (
        <p className='bg-black p-2 font-medium px-4 rounded-full'>Connected</p>
      )}
    </nav>
  )
}

export default Navbar
