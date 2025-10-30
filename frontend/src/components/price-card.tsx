import { useState } from 'react'
import type { Experience } from '../types/experience'

function PriceCard({ experience }: { experience: Experience }) {
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = () => {
    if (quantity < 5) {
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

      <button className='w-full rounded-lg bg-[#FFD643] px-5 py-3 text-base font-medium hover:bg-[#FFD643]/80'>
        Confirm
      </button>
    </div>
  )
}

export default PriceCard
