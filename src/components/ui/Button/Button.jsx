import clsx from 'clsx'

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'h-14 rounded-2xl px-6 text-lg font-bold transition duration-300',
        fullWidth ? 'w-full' : 'w-fit',

        variant === 'primary' &&
          'bg-primary text-white hover:scale-[1.01]',

        variant === 'secondary' &&
          'border border-borderSoft bg-white text-dark hover:bg-background',

        variant === 'ghost' &&
          'bg-transparent text-primary hover:bg-primary/10',

        variant === 'danger' &&
          'bg-red-500 text-white hover:bg-red-600'
      )}
    >
      {children}
    </button>
  )
}

export default Button