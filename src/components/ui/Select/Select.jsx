function Select({
    label,
    options
  }) {
    return (
      <div>
        <label className='mb-3 block text-sm font-bold text-dark'>
          {label}
        </label>
  
        <select
          className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 outline-none transition focus:border-primary'
        >
          {options.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default Select