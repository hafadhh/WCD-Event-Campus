import clsx from 'clsx'

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'h-14 rounded-2xl px-6 text-lg font-bold transition duration-300',
        fullWidth ? 'w-full' : 'w-fit',
        disabled && 'cursor-not-allowed opacity-50',

        !disabled && variant === 'primary' && 'bg-primary text-white hover:scale-[1.01]',
        !disabled && variant === 'secondary' && 'border border-borderSoft bg-white text-dark hover:bg-background',
        !disabled && variant === 'ghost' && 'bg-transparent text-primary hover:bg-primary/10',
        !disabled && variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',

        disabled && 'bg-primary text-white', // keep color when disabled
      )}
    >
      {children}
    </button>
  )
}

export default Button
