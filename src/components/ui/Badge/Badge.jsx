import clsx from 'clsx'

function Badge({
  children,
  variant = 'success'
}) {
  return (
    <span
      className={clsx(
        'rounded-full bg-accentSoft px-4 py-2 text-sm font-medium text-accent',
        // 'rounded-full px-4 py-2 text-sm font-semibold',

        variant === 'success' &&
          'bg-green-100 text-green-700',

        variant === 'warning' &&
          'bg-yellow-100 text-yellow-700',

        variant === 'danger' &&
          'bg-red-100 text-red-700',

        variant === 'info' &&
          'bg-blue-100 text-blue-700'
      )}
    >
      {children}
    </span>
  )
}

export default Badge