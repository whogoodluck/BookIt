import { useBookExperience } from '../hooks/useBooking'
import type { FormValues } from '../pages/checkout-page'
import type { Experience } from '../types/experience'
import type { Slot } from '../types/slot'
import Button from './common/button'

interface PayConfirmProps {
  experience: Experience
  slot: Slot
  quantity: number
  discountData?: { discount: number }
  formValues: FormValues | null
}

function PayConfirm({ experience, slot, quantity, discountData, formValues }: PayConfirmProps) {
  const subtotal = quantity * experience.price
  const taxPercentage = 0.08
  const taxes = Math.round(quantity * experience.price * taxPercentage)
  const discount = discountData?.discount || 0
  const total = subtotal + taxes - discount

  const { mutate, isPending } = useBookExperience()

  const handlePayAndConfirm = () => {
    if (!formValues) {
      return
    }

    const bookingData = {
      slotId: slot.id,
      experienceId: experience.id,
      fullName: formValues.fullname,
      email: formValues.email,
      quantity: quantity,
      subtotal: subtotal,
      taxes: taxes,
      totalAmount: total,
      promoCodeUsed: formValues?.promoCode,
    }

    mutate(bookingData)
  }

  return (
    <div className='w-full rounded-xl bg-[#EFEFEF] p-6 md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Experience</span>
          <span className='font-medium'>₹{experience.price}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-base text-[#656565]'>Quantity</span>
          <span className='text-base font-medium'>{experience.name}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Date</span>
          <span>{slot.date.toString().split('T')[0]}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Time</span>
          <span>{slot.time.toLowerCase()}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Qty</span>
          <span>{quantity}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Subtotal</span>
          <span>{subtotal}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-base text-[#656565]'>Taxes</span>
          <span>{taxes}</span>
        </div>

        {discountData && (
          <div className='flex justify-between'>
            <span className='text-base text-[#656565]'>Discount</span>
            <span>-{discountData.discount}</span>
          </div>
        )}

        <hr className='border-[#D9D9D9]' />

        <div className='flex items-center justify-between text-xl font-medium'>
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>

      <Button
        text='Pay & Confirm'
        disabled={!slot || !formValues}
        type='button'
        className='mt-4'
        loading={isPending}
        onClick={handlePayAndConfirm}
      />
    </div>
  )
}

export default PayConfirm
