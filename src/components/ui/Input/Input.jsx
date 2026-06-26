function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      {label && (
        <label className='mb-3 block text-sm font-bold text-dark'>
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-14 w-full rounded-2xl border bg-white px-5 outline-none transition focus:border-primary ${
          error ? 'border-red-400' : 'border-borderSoft'
        }`}
      />

      {error && (
        <p className='mt-1.5 text-xs text-red-500'>{error}</p>
      )}
    </div>
  )
}

export default Input
