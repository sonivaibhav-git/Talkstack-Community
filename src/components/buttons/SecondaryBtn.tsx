type SecondaryBtnProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const SecondaryBtn = ({
  children,
  onClick,
  disabled = false,
  type = 'button'
}: SecondaryBtnProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex gap-2 items-center justify-center
           rounded-xl px-4 py-1 w-fit
           bg-purple-200 
           text-purple-500  font-semibold
           shadow-[0_8px_24px_rgba(0,0,0,0.35)]
           transition-all duration-200;
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  )
}

export default SecondaryBtn
