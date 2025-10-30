import { Loader2Icon } from 'lucide-react'

function Loading() {
  return (
    <section className='flex h-[calc(100vh-6rem)] items-center justify-center'>
      <Loader2Icon className='h-10 w-10 animate-spin text-[#FFD643]' />
    </section>
  )
}

export default Loading
