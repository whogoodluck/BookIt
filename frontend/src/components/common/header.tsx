import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { useExperience } from '../../contexts/experience-context'
import { getExperiences } from '../../services/experience'
import Logo from './logo'

function Header() {
  const [searchText, setSearchText] = useState('')
  const { setExperiences, setIsLoading } = useExperience()

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const res = await getExperiences(searchText)
      setExperiences(res.data)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className='flex items-center justify-between px-2 py-4 shadow-lg md:px-8 lg:px-12 xl:px-[124px]'>
      <Logo />
      <form onSubmit={handleSearch} className='flex items-center space-x-2.5'>
        <input
          type='text'
          className='w-full max-w-[340px] rounded-sm bg-[#EDEDED] px-4 py-3 ring-0 outline-0'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button
          type='submit'
          className='rounded-lg bg-[#FFD643] px-3 py-3 hover:bg-[#FFD643]/80 md:px-5'
        >
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
