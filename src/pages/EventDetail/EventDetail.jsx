import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar/Navbar'
import Footer from '../../components/layout/Footer/Footer'
import { CalendarDays, Clock3, MapPin, Users, CheckCircle2, Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import {
  getEvents,
  registerForEvent,
  isRegistered,
  toggleBookmark,
  isBookmarked,
} from '../../data/store'

function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [events, setEvents] = useState([])
  const [registered, setRegistered] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success'|'error', msg }

  const eventId = Number(id)

  function load() {
    const evs = getEvents()
    setEvents(evs)
    if (user) {
      setRegistered(isRegistered(eventId, user.id))
      setBookmarked(isBookmarked(user.id, eventId))
    }
  }

  useEffect(() => { load() }, [id, user])

  function showToast(type, msg) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  function handleRegisterClick() {
    if (!user) { navigate('/login'); return }
    if (registered) return
    setShowModal(true)
  }

  function handleConfirm() {
    setLoading(true)
    const result = registerForEvent({
      eventId,
      userId: user.id,
      name: user.name,
      email: user.email,
    })
    setLoading(false)
    setShowModal(false)

    if (!result.success) {
      showToast('error', result.error)
      return
    }
    setRegistered(true)
    load()
    showToast('success', 'Pendaftaran berhasil! Cek dashboard kamu.')
  }

  function handleBookmark() {
    if (!user) { navigate('/login'); return }
    toggleBookmark(user.id, eventId)
    setBookmarked((prev) => !prev)
  }

  const event = events.find((e) => e.id === eventId)
  if (!event) return (
    <main>
      <Navbar />
      <div className="flex h-96 items-center justify-center text-secondaryText">
        Event tidak ditemukan.
      </div>
      <Footer />
    </main>
  )

  return (
    <main>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-6 py-4 text-sm font-semibold shadow-hover transition-all ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <section className='mx-auto max-w-7xl px-6 py-10'>
        <div className='relative overflow-hidden rounded-[40px] shadow-soft'>
          <img src={event.image} className='h-[480px] w-full object-cover' />
          <button
            onClick={handleBookmark}
            className={`absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full transition ${
              bookmarked
                ? 'bg-primary text-white'
                : 'bg-white/80 text-dark backdrop-blur-md hover:bg-white'
            }`}
          >
            <Heart size={22} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className='mt-10 grid gap-10 lg:grid-cols-[1fr_360px]'>
          {/* LEFT */}
          <div>
            <span className='inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white'>
              {event.category}
            </span>

            <h1 className='mt-6 text-6xl font-black leading-tight text-dark'>
              {event.title}
            </h1>

            <p className='mt-8 text-lg leading-relaxed text-secondaryText'>
              Bergabunglah dalam <strong>{event.title}</strong> — kesempatan untuk
              belajar, berkolaborasi, dan memperluas jaringan bersama sesama
              mahasiswa Universitas Cakrawala.
            </p>

            <div className='mt-12 grid gap-6 md:grid-cols-2'>
              {[
                { icon: CalendarDays, label: 'Tanggal', value: event.date },
                { icon: Clock3, label: 'Waktu', value: '09:00 – 12:00 WIB' },
                { icon: MapPin, label: 'Lokasi', value: event.location },
                { icon: Users, label: 'Peserta', value: `${event.participants} terdaftar` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className='rounded-[28px] border border-borderSoft bg-surface p-6 shadow-soft'>
                  <Icon className='text-primary' size={24} />
                  <h3 className='mt-4 text-lg font-bold text-dark'>{label}</h3>
                  <p className='mt-2 text-secondaryText'>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className='sticky top-28 rounded-[32px] border border-borderSoft bg-surface p-8 shadow-soft'>
              <h2 className='text-3xl font-black text-dark'>
                {registered ? 'Sudah Terdaftar ✓' : 'Daftar Event'}
              </h2>
              <p className='mt-3 leading-relaxed text-secondaryText'>
                {registered
                  ? 'Informasi lebih lanjut akan dikirim ke email kamu.'
                  : 'Gratis. Amankan tempatmu sekarang.'}
              </p>

              <button
                onClick={handleRegisterClick}
                disabled={registered}
                className={`mt-6 w-full rounded-2xl py-5 text-lg font-bold transition ${
                  registered
                    ? 'cursor-not-allowed bg-green-50 text-green-700'
                    : 'bg-primary text-white hover:scale-[1.02] active:scale-100'
                }`}
              >
                {registered ? '✓ Terdaftar' : 'Daftar Sekarang'}
              </button>

              <div className='mt-8'>
                <div className='mb-3 flex justify-between text-sm'>
                  <span className='text-secondaryText'>Kapasitas</span>
                  <span className='font-semibold text-primary'>{event.progress}% Terisi</span>
                </div>
                <div className='h-3 overflow-hidden rounded-full bg-background'>
                  <div
                    className='h-full rounded-full bg-primary transition-all'
                    style={{ width: `${event.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Konfirmasi Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm'>
          <div className='w-full max-w-md rounded-[32px] bg-surface p-8 shadow-hover'>
            <h2 className='text-2xl font-black text-dark'>Konfirmasi Pendaftaran</h2>
            <p className='mt-2 text-secondaryText'>
              Kamu akan mendaftar ke event ini.
            </p>

            <div className='mt-6 space-y-3 rounded-2xl bg-background p-5'>
              <Row label='Event' value={event.title} />
              <Row label='Tanggal' value={event.date} />
              <Row label='Nama' value={user?.name} />
              <Row label='Email' value={user?.email} />
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={() => setShowModal(false)}
                className='flex-1 rounded-2xl border border-borderSoft py-4 font-semibold text-dark hover:bg-background'
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className='flex-1 rounded-2xl bg-primary py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60'
              >
                {loading ? 'Mendaftar...' : 'Ya, Daftar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Row({ label, value }) {
  return (
    <div className='flex justify-between gap-4'>
      <span className='text-sm text-secondaryText'>{label}</span>
      <span className='text-right text-sm font-semibold text-dark'>{value}</span>
    </div>
  )
}

export default EventDetail
