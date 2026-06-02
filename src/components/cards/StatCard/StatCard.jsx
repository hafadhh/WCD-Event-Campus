function StatCard({
    title,
    value,
    description
  }) {
    return (
      <div className='rounded-[30px] border border-borderSoft bg-white p-7 shadow-card'>
        <p className='text-sm font-bold uppercase tracking-wide text-softText'>
          {title}
        </p>
  
        <h2 className='mt-5 text-5xl font-black text-dark'>
          {value}
        </h2>
  
        <p className='mt-4 leading-relaxed text-softText'>
          {description}
        </p>
      </div>
    )
  }
  
  export default StatCard