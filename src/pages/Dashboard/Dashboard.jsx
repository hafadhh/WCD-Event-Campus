import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import StatCard from '../../components/cards/StatCard/StatCard'
import EventCard from '../../components/cards/EventCard/EventCard'
import { useAuth } from '../../context/AuthContext'
import { getRegistrationsByUser, getEvents } from '../../data/store'

function Dashboard() {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [joinedEvents, setJoinedEvents] = useState([])

  useEffect(() => {
    const regs = getRegistrationsByUser(user?.id)
    setRegistrations(regs)
    const allEvents = getEvents()
    const joined = allEvents.filter((e) => regs.some((r) => r.eventId === e.id))
    setJoinedEvents(joined)
  }, [user])

  return (
    <DashboardLayout
      pageTitle={`Halo, ${user?.name?.split(' ')[0]} 👋`}
      pageSubtitle="Selamat datang kembali di CampusPulse."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Event Diikuti"
          value={String(registrations.length)}
          description="Total event yang sudah kamu daftarkan."
        />
        <StatCard
          title="Event Tersedia"
          value={String(getEvents().length)}
          description="Event aktif yang bisa kamu ikuti sekarang."
        />
        <StatCard
          title="Status Akun"
          value="Aktif"
          description="Akunmu dalam kondisi baik."
        />
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black">Event Saya</h2>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-[32px] border border-borderSoft bg-surface py-20 text-center">
            <p className="text-2xl font-black text-dark">Belum ada event</p>
            <p className="mt-3 text-secondaryText">
              Kamu belum mendaftar ke event apapun.
            </p>
            <a
              href="/"
              className="mt-6 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Temukan Event
            </a>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 xl:grid-cols-3">
            {joinedEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
