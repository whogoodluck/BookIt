import Logo from './logo'

function Header() {
  return (
    <header className='flex items-center justify-between px-2 py-4 shadow-lg md:px-8 lg:px-12 xl:px-[124px]'>
      <Logo />
      <div className='flex items-center space-x-2.5'>
        <input
          type='text'
          className='w-full max-w-[340px] rounded-sm bg-[#EDEDED] px-4 py-3 ring-0 outline-0'
        />
        <button className='rounded-lg bg-[#FFD643] px-3 py-3 hover:bg-[#FFD643]/80 md:px-5'>
          Search
        </button>
      </div>
    </header>
  )
}

export default Header
