function Textarea({
    label,
    placeholder
  }) {
    return (
      <div>
        <label className='mb-3 block text-sm font-bold text-dark'>
          {label}
        </label>
  
        <textarea
          rows={6}
          placeholder={placeholder}
          className='w-full rounded-2xl border border-borderSoft bg-white p-5 outline-none transition focus:border-primary'
        />
      </div>
    )
  }
  
  export default Textarea