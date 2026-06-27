import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import Hero from '../../components/sections/Hero/Hero'
import EventCard from '../../components/cards/EventCard/EventCard'
import Footer from '../../components/layout/Footer/Footer'
import { getEvents } from '../../data/store'

const CATEGORIES = ['Semua', 'Workshop', 'Seminar', 'Career', 'Competition', 'Art', 'Technology', 'Music', 'Networking']
const DATE_FILTERS = ['Semua', 'Bulan Ini', '30 Hari Ke Depan']

// Parse "05 JUL, 2026" → Date
const MONTH_MAP = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MEI: 4, MAY: 4,
  JUN: 5, JUL: 6, AGS: 7, AUG: 7, SEP: 8, OKT: 9,
  OCT: 9, NOV: 10, DES: 11, DEC: 11,
}

function parseEventDate(dateStr) {
  if (!dateStr) return null
  // Format: "05 JUL, 2026"
  const parts = dateStr.replace(',', '').split(' ')
  if (parts.length < 3) return null
  const day = parseInt(parts[0])
  const month = MONTH_MAP[parts[1].toUpperCase()]
  const year = parseInt(parts[2])
  if (isNaN(day) || month === undefined || isNaN(year)) return null
  return new Date(year, month, day)
}

function Home() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [activeDate, setActiveDate] = useState('Semua')
  const [sort, setSort] = useState('terbaru')

  useEffect(() => { setEvents(getEvents()) }, [])

  const filtered = useMemo(() => {
    let result = [...events]
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    }

    // Category
    if (activeCategory !== 'Semua') {
      result = result.filter((e) => e.category === activeCategory)
    }

    // Date filter
    if (activeDate === 'Bulan Ini') {
      result = result.filter((e) => {
        const d = parseEventDate(e.date)
        if (!d) return false
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      })
    } else if (activeDate === '30 Hari Ke Depan') {
      const limit = new Date(now)
      limit.setDate(limit.getDate() + 30)
      result = result.filter((e) => {
        const d = parseEventDate(e.date)
        if (!d) return false
        return d >= now && d <= limit
      })
    }

    // Sort
    if (sort === 'terbaru') result = [...result].sort((a, b) => a.id - b.id)
    if (sort === 'populer') result = [...result].sort((a, b) => b.participants - a.participants)
    if (sort === 'hampir-penuh') result = [...result].sort((a, b) => b.progress - a.progress)

    return result
  }, [events, search, activeCategory, activeDate, sort])

  return (
    <main>
      <Navbar />

      <section className='mx-auto max-w-7xl px-6 py-10'>
        <Hero onSearch={setSearch} />

        {/* Filter bar */}
        <div className='mt-10 flex flex-col gap-4 rounded-[28px] border border-borderSoft bg-surface p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap gap-2'>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'border border-borderSoft bg-background text-secondaryText hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className='h-11 rounded-2xl border border-borderSoft bg-background px-4 text-sm font-medium text-dark outline-none focus:border-primary'
          >
            <option value='terbaru'>Terbaru</option>
            <option value='populer'>Terpopuler</option>
            <option value='hampir-penuh'>Hampir Penuh</option>
          </select>
        </div>

        {/* Date filter */}
        <div className='mt-4 flex gap-2'>
          {DATE_FILTERS.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDate(d)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeDate === d
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'border border-borderSoft text-secondaryText hover:border-primary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className='mt-10 flex items-center justify-between'>
          <h2 className='text-4xl font-black text-dark'>{filtered.length} Event Ditemukan</h2>
        </div>

        {filtered.length === 0 ? (
          <div className='mt-16 flex flex-col items-center justify-center rounded-[32px] border border-borderSoft bg-surface py-24 text-center'>
            <p className='text-2xl font-black text-dark'>Tidak ada event</p>
            <p className='mt-3 text-secondaryText'>Coba ubah filter atau kata kunci pencarian.</p>
            <button
              onClick={() => { setActiveCategory('Semua'); setActiveDate('Semua'); setSearch('') }}
              className='mt-6 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]'
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className='mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
            {filtered.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

export default Home
