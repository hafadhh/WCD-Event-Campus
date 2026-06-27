import { Search } from 'lucide-react'
import { useState } from 'react'

function Hero({ onSearch }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
    onSearch?.(e.target.value)
  }

  function handleFind() {
    onSearch?.(value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleFind()
  }

  return (
    <section className='relative overflow-hidden rounded-[36px] bg-heroGradient px-10 py-24 shadow-soft'>
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='text-6xl font-black leading-[0.95] text-dark lg:text-8xl'>
          Explore Campus Life
        </h1>

        <p className='mt-6 text-lg leading-8 text-softText'>
          Temukan workshop, seminar, dan event terbaik di Universitas Cakrawala.
        </p>

        <div className='mt-12 flex h-20 items-center overflow-hidden rounded-[40px] border border-borderSoft bg-surface px-6 shadow-soft'>
          <Search className='text-primary' />
          <input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Cari event, lokasi, atau kategori...'
            className='h-full flex-1 bg-transparent px-4 text-lg outline-none'
          />
          <button
            onClick={handleFind}
            className='rounded-full bg-primary px-10 py-4 font-semibold text-white transition hover:scale-105'
          >
            Cari
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
