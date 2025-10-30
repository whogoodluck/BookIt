import { Link } from 'react-router-dom'
import type { Experience } from '../types/experience'

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div
      key={experience.id}
      className='w-full grow overflow-hidden rounded-xl bg-[#F0F0F0] md:max-w-[380px]'
    >
      <img src={experience.imageUrl} alt={experience.name} className='h-[230px] w-full' />
      <div className='flex flex-col gap-5 px-4 py-3'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[16px] font-medium'>{experience.name}</h1>
          <span className='rounded bg-[#D6D6D6] px-2 py-1 text-[11px] font-medium'>
            {experience.location}
          </span>
        </div>
        <p className='line-clamp-2 text-[12px] font-normal text-[#6C6C6C]'>
          {experience.description}
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1.5 text-[12px] font-normal'>
            From
            <span className='text-xl font-medium'>₹{experience.price}</span>
          </div>
          <Link
            to={`/experiences/${experience.id}`}
            className='rounded-sm bg-[#FFD643] px-2 py-1.5 text-sm font-medium'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
