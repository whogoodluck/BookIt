import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation } from 'react-router-dom'
import PayConfirm from '../components/pay-confirm-card'
import { useValidatePromoCode } from '../hooks/usePromo'

export interface FormValues {
  fullname: string
  email: string
  promoCode?: string
  terms: boolean
}

function Checkout() {
  const [formData, setFormData] = useState<FormValues | null>(null)
  const location = useLocation()
  const { experience, slot, quantity } = location.state || {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { mutate, isPending, data } = useValidatePromoCode()

  if (!slot || !experience) {
    return <Navigate to='/' />
  }

  const onSubmit = (formData: FormValues) => {
    setFormData(formData)

    if (!formData.promoCode) {
      return
    }

    mutate({
      code: formData.promoCode || '',
      subtotal: experience.price * quantity,
    })
  }

  return (
    <section className='py-4 md:py-6'>
      <Link
        to={`/experiences/${experience?.id}`}
        className='flex items-center gap-2 text-sm font-medium'
      >
        <ArrowLeft className='h-6 w-6' /> Checkout
      </Link>
      <div className='mt-6 flex flex-col items-start gap-12 lg:flex-row lg:justify-between'>
        <div className='w-full flex-1 rounded-xl bg-[#EFEFEF] px-6 py-5'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-6'>
              <div className='flex w-full flex-col gap-2'>
                <label htmlFor='Full name' className='text-sm text-[#5B5B5B]'>
                  Full name
                </label>
                <input
                  type='text'
                  {...register('fullname', { required: 'Full name is required' })}
                  placeholder='Your name'
                  className='w-full rounded-sm bg-[#DDDDDD] px-4 py-3 ring-0 outline-0'
                />
                {errors.fullname && (
                  <p className='mt-1 text-sm text-red-500'>{errors.fullname.message}</p>
                )}
              </div>
              <div className='flex w-full flex-col gap-2'>
                <label htmlFor='Email' className='text-sm text-[#5B5B5B]'>
                  Email
                </label>
                <input
                  type='text'
                  {...register('email', { required: 'Email is required' })}
                  placeholder='Your email'
                  className='w-full rounded-sm bg-[#DDDDDD] px-4 py-3 ring-0 outline-0'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className='mt-5 flex w-full items-center gap-4'>
              <input
                type='text'
                {...register('promoCode')}
                placeholder='Promo code'
                className='w-full rounded-sm bg-[#DDDDDD] px-4 py-3 ring-0 outline-0'
              />
              <button
                type='submit'
                className='rounded-lg bg-[#161616] px-4 py-3 text-sm font-medium text-[#F9F9F9] hover:bg-[#161616]/80'
              >
                {isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Apply'}
              </button>
            </div>
            <div className='mt-4 flex items-center gap-2'>
              <input
                type='checkbox'
                required
                {...register('terms', { required: 'You must agree to the terms' })}
                className='cursor-pointer border-[#5B5B5B] accent-[#141414]'
              />
              <label htmlFor='terms' className='text-xs text-[#5B5B5B]'>
                I agree to the terms and safety policy
              </label>
            </div>
          </form>
        </div>
        {data?.success ? (
          <PayConfirm
            experience={experience}
            slot={slot}
            quantity={quantity}
            formValues={formData}
            discountData={data.data}
          />
        ) : (
          <PayConfirm
            experience={experience}
            slot={slot}
            quantity={quantity}
            formValues={formData}
          />
        )}
      </div>
    </section>
  )
}

export default Checkout
