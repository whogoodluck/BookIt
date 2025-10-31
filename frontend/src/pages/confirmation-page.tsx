import { Check } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'

function Confirmation() {
  const location = useLocation()
  const { data } = location.state || {}

  if (!data) {
    return <Navigate to='/' />
  }

  return (
    <section className='flex flex-col items-center justify-center py-20'>
      <span className='mb-8 rounded-full bg-[#24AC39] p-6'>
        <Check size={60} strokeWidth={4} color='#FFFFFF' />
      </span>
      <div className='mb-8 text-center'>
        <h1 className='mb-4 text-4xl font-medium'>Booking Confirmed</h1>
        <p className='text-xl text-[#656565]'>Ref ID: {data.refId}</p>
      </div>
      <Link
        to='/'
        className='rounded-sm bg-[#E3E3E3] px-4 py-2 text-base font-normal hover:bg-[#E3E3E3]/80'
      >
        Back to Home
      </Link>
    </section>
  )
}

export default Confirmation
