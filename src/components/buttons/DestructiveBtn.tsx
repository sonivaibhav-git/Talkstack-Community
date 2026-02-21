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
      className={`flex w-full items-center gap-2 text-sm font-semibold text-red-500 bg-red-200 px-4 py-2 transition rounded-xl disabled:opacity-60
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  )
}

export default DestructiveBtn
