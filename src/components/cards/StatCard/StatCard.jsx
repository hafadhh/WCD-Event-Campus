function StatCard({
    title,
    value,
    description
  }) {
    return (
      <div className="rounded-[30px] border border-[#eee6dc] bg-white p-6 shadow-[0_14px_32px_rgba(48,39,30,0.06)]">
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