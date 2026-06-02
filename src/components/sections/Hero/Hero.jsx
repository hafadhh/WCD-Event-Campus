import { Search } from 'lucide-react'

function Hero() {
  return (
    <section className='w-full relative overflow-hidden py-28 rounded-[36px] bg-heroGradient px-10 shadow-soft'>
      <div className='mx-auto max-w-4xl text-center'>
        {/* <h1 className='text-6xl leading-[0.95] font-black text-dark'> */}
        <h1 className='lg:text-8xl leading-[0.95] font-black text-dark'>
        {/* <h1 className='text-6xl font-black leading-tight text-dark'> */}
          Explore Campus Life
        </h1>

        <p className='mt-6 text-lg leading-8 text-secondaryText text-softText'>
        {/* <p className='mt-6 text-xl leading-relaxed text-softText'> */}
          Find the best workshops, social gatherings, and professional events
          happening across the campus today.
        </p>

        <div className='rounded-[40px] bg-surface shadow-soft mt-12 flex h-20 items-center overflow-hidden border border-borderSoft px-6 '>
        {/* <div className='mt-12 flex h-20 items-center overflow-hidden rounded-full border border-borderSoft bg-white px-6 shadow-card'> */}
          <Search className='text-primary' />

          <input
            placeholder='Search for events, organizations, or keywords...'
            className='h-full flex-1 bg-transparent px-4 text-lg outline-none'
          />

          <button className='rounded-full bg-primary px-10 py-4 font-semibold text-white transition hover:scale-105'>
            Find
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero