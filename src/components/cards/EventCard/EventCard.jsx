import { Heart, MapPin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { toggleBookmark, isBookmarked } from '../../../data/store'
import { useState } from 'react'

function EventCard({ id, title, image, category, date, location, progress }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState(
    user ? isBookmarked(user.id, id) : false
  )

  function handleBookmark(e) {
    e.preventDefault()   // jangan trigger Link
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    toggleBookmark(user.id, id)
    setBookmarked((prev) => !prev)
  }

  return (
    <Link to={`/event/${id}`}>
      <div className='rounded-card border border-borderSoft bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-hover'>
        <div className='relative h-52 overflow-hidden'>
          <img
            src={image}
            className='h-full w-full object-cover transition duration-500 group-hover:scale-110'
          />
          <div className='absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white'>
            {category}
          </div>
          <button
            onClick={handleBookmark}
            className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-lg transition ${
              bookmarked
                ? 'bg-primary text-white'
                : 'bg-white/70 text-dark hover:bg-white'
            }`}
          >
            <Heart size={18} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className='space-y-5 p-6'>
          <div>
            <p className='text-sm font-semibold text-primary'>{date}</p>
            <h3 className='mt-3 font-serif text-[25px] leading-[1] text-dark'>{title}</h3>
          </div>

          <div className='flex items-center gap-2 text-softText'>
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          <div>
            <div className='mb-2 flex justify-between text-sm'>
              <span>Capacity</span>
              <span className='font-semibold text-primary'>{progress}% Filled</span>
            </div>
            <div className='h-3 overflow-hidden rounded-full bg-secondary'>
              <div className='h-full rounded-full bg-primary' style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
