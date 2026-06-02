function SectionTitle({
    title,
    subtitle,
    action
  }) {
    return (
      <div className='flex items-end justify-between gap-5'>
        <div>
          <h2 className='text-4xl font-black text-dark'>
            {title}
          </h2>
  
          {subtitle && (
            <p className='mt-3 leading-relaxed text-softText'>
              {subtitle}
            </p>
          )}
        </div>
  
        {action}
      </div>
    )
  }
  
  export default SectionTitle