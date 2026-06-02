function CreateEventBanner({ onCreate }) {
    return (
      <section className='relative overflow-hidden rounded-[36px] bg-heroGradient p-10 shadow-soft'>
        <div className='max-w-2xl'>
          <p className='text-sm font-bold uppercase tracking-wide text-primary'>
            Organizer Panel
          </p>
  
          <h1 className='mt-5 text-5xl font-black leading-tight text-dark'>
            Manage and launch your campus events.
          </h1>
  
          <p className='mt-6 text-lg leading-relaxed text-softText'>
            Create workshops, competitions, seminars, and community gatherings
            for students across campus.
          </p>
  
          <button onClick={onCreate} className='mt-8 rounded-2xl bg-primary px-7 py-4 text-lg font-bold text-white transition hover:scale-[1.02]'>
            Create New Event
          </button>
        </div>
      </section>
    )
  }
  
  export default CreateEventBanner