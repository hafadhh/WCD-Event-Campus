import { Search } from 'lucide-react'

function Hero() {
  return (
    <section className='relative w-full overflow-hidden rounded-[36px] border border-white/70 bg-[#fbf7f2] px-10 py-28 shadow-[0_24px_70px_rgba(84,67,48,0.16)]'>
      <div className='pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-black/5' />

      <div className='relative mx-auto max-w-4xl text-center'>
        <h1 className='text-6xl font-black leading-[0.95] text-primaryText lg:text-8xl'>
          Explore Campus Life
        </h1>

        <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-secondaryText'>
          Find the best workshops, social gatherings, and professional events
          happening across the campus today.
        </p>

        <div className='mt-12 flex h-20 items-center overflow-hidden rounded-[40px] border border-black/5 bg-white px-6 shadow-[0_18px_45px_rgba(84,67,48,0.18)]'>
          <Search className='shrink-0 text-primary' />

          <input
            placeholder='Search for events, organizations, or keywords...'
            className='h-full flex-1 bg-transparent px-4 text-lg text-primaryText outline-none placeholder:text-gray-400'
          />

          <button className='rounded-full bg-primary px-10 py-4 font-semibold text-white shadow-[0_10px_24px_rgba(124,143,122,0.35)] transition hover:scale-105'>
            Find
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero