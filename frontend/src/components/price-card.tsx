import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Experience } from '../types/experience'
import type { Slot } from '../types/slot'
import Button from './common/button'

interface PriceCardProps {
  experience: Experience
  slot: Slot | null
}

function PriceCard({ experience, slot }: PriceCardProps) {
  const [quantity, setQuantity] = useState(1)

  const navigate = useNavigate()

  const handleIncrease = () => {
    if (slot && quantity < slot.capacity - slot.booked) {
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const subtotal = quantity * experience.price
  const taxPercentage = 0.08
  const taxes = Math.round(quantity * experience.price * taxPercentage)
  const total = subtotal + taxes

  return (
    <div className='w-full rounded-xl bg-[#EFEFEF] p-6 md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Starts at</span>
          <span className='font-medium'>₹{experience.price}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-base text-[#656565]'>Quantity</span>
          <div className='flex items-center gap-2'>
            <button onClick={handleDecrease} className='border border-[#C9C9C9] px-1 text-xs'>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrease} className='border border-[#C9C9C9] px-1 text-xs'>
              +
            </button>
          </div>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <hr className='border-[#D9D9D9]' />

        <div className='flex items-center justify-between text-xl font-medium'>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <Button
        text='Confirm'
        disabled={!slot}
        type='button'
        className='mt-4'
        onClick={() => navigate('/checkout', { state: { experience, slot, quantity } })}
      />
    </div>
  )
}

export default PriceCard
