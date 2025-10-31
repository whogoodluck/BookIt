import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/common/loading'
import PriceCard from '../components/price-card'
import { useGetExperienceById } from '../hooks/useExperience'
import type { Experience } from '../types/experience'
import type { Slot } from '../types/slot'

function ExperienceDetails() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const { id } = useParams()

  const { data, isPending } = useGetExperienceById(id!)

  if (isPending) {
    return <Loading />
  }

  const formattedDate = (date: Date | undefined) => {
    if (!date) return ''

    return date.toLocaleDateString('en-GB', {
      month: 'short',
      day: '2-digit',
    })
  }

  const experience: Experience = data.data.experience
  const slots: Slot[] = data.data.slots

  const setOfDates = Array.from(new Set(slots.map(slot => slot.date)))

  const getGroupedSlots = (date: string) => {
    return slots.filter(slot => slot.date === date)
  }

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
              <div className='flex items-center gap-4'>
                {setOfDates.map(date => (
                  <button
                    key={date}
                    className={`rounded-sm border px-3 py-2 text-sm font-normal ${
                      formattedDate(new Date(date)) === formattedDate(selectedDate)
                        ? 'border-[#FFD643] bg-[#FFD643]'
                        : 'border-[#838383] text-[#838383]'
                    }`}
                    onClick={() => setSelectedDate(new Date(date))}
                  >
                    {formattedDate(new Date(date))}
                  </button>
                ))}
              </div>
            </div>
            {selectedDate && (
              <div>
                <h1 className='mb-3 text-lg font-medium'>Choose Time</h1>
                <div className='mb-3 flex items-center gap-4'>
                  {getGroupedSlots(selectedDate.toISOString()).map(slot => (
                    <button
                      key={slot.id}
                      className={`rounded-sm border px-3 py-2 text-sm font-normal ${
                        slot.isSoldOut
                          ? 'border-[#CCCCCC] bg-[#CCCCCC] text-[#838383]'
                          : slot.time === selectedSlot?.time
                            ? 'border-[#FFD643] bg-[#FFD643]'
                            : 'border-[#CCCCCC] text-[#838383]'
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot.time.toLowerCase()}{' '}
                      {slot.isSoldOut ? (
                        <span className='text-xs text-[#6A6A6A]'>Sold Out</span>
                      ) : (
                        <span className='text-xs text-[#FF4C0A]'>
                          {slot.capacity - slot.booked} left
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className='text-xs font-normal text-[#6C6C6C]'>
                  All times are in IST (GMT + 5:30)
                </p>
              </div>
            )}
            <div>
              <h1 className='mb-3 text-lg font-medium'>About</h1>
              <p className='rounded bg-[#EEEEEE] px-2 py-3 text-sm text-[#6C6C6C]'>
                {experience.includes.join(', ')}. Minumum age {experience.minAge}.
              </p>
            </div>
          </div>
        </div>
        <PriceCard experience={experience} slot={selectedSlot} />
      </div>
    </section>
  )
}

export default ExperienceDetails
