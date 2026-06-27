import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import EventCard from '../../components/cards/EventCard/EventCard'
import { useAuth } from '../../context/AuthContext'
import { getBookmarks, toggleBookmark, getEvents } from '../../data/store'

function Bookmarks() {
  const { user } = useAuth()
  const [bookmarkedEvents, setBookmarkedEvents] = useState([])

  function load() {
    const bm = getBookmarks(user?.id)
    const evs = getEvents().filter((e) => bm.includes(e.id))
    setBookmarkedEvents(evs)
  }

  useEffect(() => { load() }, [user])

  function handleRemove(eventId) {
    toggleBookmark(user.id, eventId)
    load()
  }

  return (
    <DashboardLayout pageTitle='Bookmarks' pageSubtitle='Event yang kamu simpan.'>
      {bookmarkedEvents.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-[32px] border border-borderSoft bg-surface py-24 text-center'>
          <p className='text-2xl font-black text-dark'>Belum ada bookmark</p>
          <p className='mt-3 text-secondaryText'>
            Tekan ikon ❤ di halaman event untuk menyimpannya.
          </p>
          <a
            href='/'
            className='mt-6 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]'
          >
            Temukan Event
          </a>
        </div>
      ) : (
        <div className='grid gap-8 xl:grid-cols-3'>
          {bookmarkedEvents.map((event) => (
            <div key={event.id}>
              <EventCard {...event} />
              <button
                onClick={() => handleRemove(event.id)}
                className='mt-3 w-full rounded-2xl border border-borderSoft py-2.5 text-sm font-semibold text-secondaryText transition hover:border-red-200 hover:text-red-500'
              >
                Hapus Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default Bookmarks
