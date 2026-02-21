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
      className={`px-3 py-1 w-fit border-2 border-neutral-400 flex flex-row items-center gap-2 rounded-xl hover:shadow-xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  )
}

export default SecondaryBtn
