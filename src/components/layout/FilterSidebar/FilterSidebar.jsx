function FilterSidebar() {
    return (
      <aside className='sticky top-28 h-fit rounded-[32px] border border-borderSoft bg-white p-6 shadow-card'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold'>Filters</h3>
  
          <button className='text-sm font-semibold text-primary'>
            Clear all
          </button>
        </div>
  
        <div className='mt-10 space-y-10'>
          {/* Date */}
          <div>
            <p className='mb-4 text-sm font-bold uppercase tracking-wide text-softText'>
              Date Range
            </p>
  
            <div className='space-y-3'>
              {['Today', 'This Weekend', 'Next 30 Days'].map((item) => (
                <button
                  key={item}
                  className='w-full rounded-2xl border border-borderSoft bg-background px-5 py-4 text-left transition hover:border-primary hover:bg-secondary/30'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Categories */}
          <div>
            <p className='mb-4 text-sm font-bold uppercase tracking-wide text-softText'>
              Categories
            </p>
  
            <div className='flex flex-wrap gap-3'>
              {['All', 'Tech', 'Art', 'Sports', 'Music'].map((item) => (
                <button
                  key={item}
                  className='rounded-full border border-borderSoft bg-background px-5 py-3 text-sm font-medium transition hover:bg-primary hover:text-white'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Price */}
          <div>
            <p className='mb-4 text-sm font-bold uppercase tracking-wide text-softText'>
              Price
            </p>
  
            <div className='grid grid-cols-2 gap-3'>
              <button className='rounded-2xl border border-primary bg-primary/10 px-5 py-4 font-semibold text-primary'>
                Free
              </button>
  
              <button className='rounded-2xl border border-borderSoft bg-background px-5 py-4 font-semibold'>
                Paid
              </button>
            </div>
          </div>
        </div>
      </aside>
    )
  }
  
  export default FilterSidebar