import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import EventCard from '../../components/cards/EventCard/EventCard'
import { useAuth } from '../../context/AuthContext'
import { getRegistrationsByUser, getEvents, cancelRegistration } from '../../data/store'

function MyEvents() {
  const { user } = useAuth()
  const [joinedEvents, setJoinedEvents] = useState([])

  function load() {
    const regs = getRegistrationsByUser(user?.id)
    const allEvents = getEvents()
    const joined = allEvents.filter((e) => regs.some((r) => r.eventId === e.id))
    setJoinedEvents(joined)
  }

  useEffect(() => { load() }, [user])

  function handleCancel(eventId) {
    if (!confirm('Batalkan pendaftaran dari event ini?')) return
    cancelRegistration(eventId, user.id)
    load()
  }

  return (
    <DashboardLayout pageTitle="Event Saya" pageSubtitle="Semua event yang sudah kamu ikuti.">
      {joinedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[32px] border border-borderSoft bg-surface py-24 text-center">
          <p className="text-2xl font-black text-dark">Belum ada event</p>
          <p className="mt-3 text-secondaryText">Kamu belum mendaftar ke event apapun.</p>
          <a
            href="/"
            className="mt-6 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            Temukan Event
          </a>
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-3">
          {joinedEvents.map((event) => (
            <div key={event.id} className="relative">
              <EventCard {...event} />
              <button
                onClick={() => handleCancel(event.id)}
                className="mt-3 w-full rounded-2xl border border-red-200 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Batalkan Pendaftaran
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default MyEvents
