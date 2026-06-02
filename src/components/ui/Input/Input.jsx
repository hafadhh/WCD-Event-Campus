function Input({
    label,
    type = 'text',
    placeholder
  }) {
    return (
      <div>
        <label className='mb-3 block text-sm font-bold text-dark'>
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 outline-none transition focus:border-primary'
        />
      </div>
    )
  }
  
  export default Input