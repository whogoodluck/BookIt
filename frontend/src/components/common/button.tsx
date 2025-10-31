import { Loader2Icon } from 'lucide-react'

interface ButtonProps {
  text?: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

function Button({
  text = 'submit',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`w-full rounded-lg px-5 py-3 text-center text-base font-medium ${className} ${
        disabled ? 'bg-[#D9D9D9]' : 'bg-[#FFD643] hover:bg-[#FFD643]/80'
      }`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <Loader2Icon className='mx-auto h-4 w-4 animate-spin' /> : text}
    </button>
  )
}

export default Button
