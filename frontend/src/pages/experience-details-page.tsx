import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/common/loading'
import PriceCard from '../components/price-card'
import { useGetExperienceById } from '../hooks/useExperience'
import type { Experience } from '../types/experience'

function ExperienceDetails() {
  const { id } = useParams()

  const { data, isPending } = useGetExperienceById(id!)

  if (isPending) {
    return <Loading />
  }

  const experience: Experience = data.data.experience

  return (
    <section className='py-4 md:py-6'>
      <Link to='/' className='flex items-center gap-2 text-sm font-medium'>
        <ArrowLeft className='h-6 w-6' /> Details
      </Link>
      <div className='mt-6 flex flex-col items-start gap-12 lg:flex-row lg:justify-between'>
        <div className='w-full flex-1'>
          <div className='overflow-hidden rounded-xl'>
            <img
              src={experience.imageUrl}
              alt={experience.name}
              className='h-[500px] w-full object-cover'
            />
          </div>
          <div className='mt-8 flex flex-col gap-8'>
            <div>
              <h1 className='mb-4 text-2xl font-medium'>{experience.name}</h1>
              <p className='text-base leading-6 text-[#6C6C6C]'>{experience.description}</p>
            </div>
            <div>
              <h1 className='mb-3 text-lg font-medium'>Choose Date</h1>
            </div>
            <div>
              <h1 className='mb-3 text-lg font-medium'>Choose Time</h1>
              <p className='text-xs font-normal text-[#6C6C6C]'>
                All times are in IST (GMT + 5:30)
              </p>
            </div>
            <div>
              <h1 className='mb-3 text-lg font-medium'>About</h1>
              <p className='rounded bg-[#EEEEEE] px-2 py-3 text-sm text-[#6C6C6C]'>
                {experience.includes.join(', ')}. Minumum age {experience.minAge}.
              </p>
            </div>
          </div>
        </div>
        <PriceCard experience={experience} />
      </div>
    </section>
  )
}

export default ExperienceDetails
