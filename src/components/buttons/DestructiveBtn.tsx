type DestructiveBtnProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const DestructiveBtn = ({
  children,
  onClick,
  disabled = false,
  type = 'button'
}: DestructiveBtnProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex gap-2 items-center justify-center w-fit
           rounded-xl px-4 py-1
           text-red-500  font-semibold
           transition-all duration-200;
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  )
}

export default DestructiveBtn
