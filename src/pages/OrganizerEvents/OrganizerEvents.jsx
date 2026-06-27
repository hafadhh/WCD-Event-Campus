import { useEffect, useState, useMemo } from 'react'
import OrganizerLayout from '../../layouts/OrganizerLayout/OrganizerLayout'
import Badge from '../../components/ui/Badge/Badge'
import { Pencil, Trash2, Plus, Users, X, Search } from 'lucide-react'
import {
  getEvents, createEvent, updateEvent, deleteEvent,
  getRegistrations, cancelRegistration,
} from '../../data/store'

const CATEGORIES = ['Workshop', 'Seminar', 'Career', 'Competition', 'Art', 'Technology', 'Music', 'Networking']
const STATUSES = ['Published', 'Draft', 'Ongoing', 'Selesai']

const BADGE_VARIANT = {
  Published: 'success',
  Draft: 'warning',
  Ongoing: 'info',
  Selesai: 'danger',
}

function OrganizerEvents() {
  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'Workshop', date: '', location: '', image: '', status: 'Published' })
  const [formError, setFormError] = useState('')

  function load() { setEvents(getEvents()); setRegistrations(getRegistrations()) }
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return events
    const q = search.toLowerCase()
    return events.filter(
      (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    )
  }, [events, search])

  function openCreate() {
    setEditTarget(null)
    setForm({ title: '', category: 'Workshop', date: '', location: '', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', status: 'Published' })
    setFormError(''); setShowModal(true)
  }

  function openEdit(event) {
    setEditTarget(event)
    setForm({ title: event.title, category: event.category, date: event.date, location: event.location, image: event.image, status: event.status || 'Published' })
    setFormError(''); setShowModal(true)
  }

  function handleSave() {
    if (!form.title || !form.date || !form.location) { setFormError('Judul, tanggal, dan lokasi wajib diisi.'); return }
    if (editTarget) updateEvent(editTarget.id, form)
    else createEvent({ ...form })
    setShowModal(false); load()
  }

  function handleDelete(id) {
    if (!confirm('Hapus event ini beserta semua pendaftarannya?')) return
    deleteEvent(id); load()
  }

  const eventParticipants = viewEvent ? registrations.filter((r) => r.eventId === viewEvent.id) : []

  return (
    <OrganizerLayout title='Events' subtitle='Buat dan kelola semua event kampus.'>
      <div className='rounded-[32px] border border-borderSoft bg-surface p-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-2xl font-black text-dark'>Daftar Event</h2>
          <div className='flex gap-3'>
            {/* Search */}
            <div className='flex h-11 items-center gap-2 rounded-2xl border border-borderSoft bg-background px-4'>
              <Search size={16} className='text-secondaryText' />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Cari event...'
                className='bg-transparent text-sm outline-none w-48'
              />
            </div>
            <button
              onClick={openCreate}
              className='flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-semibold text-white transition hover:scale-[1.02]'
            >
              <Plus size={18} /> Event Baru
            </button>
          </div>
        </div>

        <div className='mt-8 overflow-hidden rounded-3xl border border-borderSoft'>
          <table className='w-full border-collapse'>
            <thead className='bg-background'>
              <tr>
                {['Event', 'Kategori', 'Status', 'Peserta', 'Aksi'].map((h) => (
                  <th key={h} className={`px-6 py-5 text-sm font-bold uppercase tracking-wide text-secondaryText ${h === 'Aksi' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className='px-6 py-12 text-center text-secondaryText'>Tidak ada event ditemukan.</td></tr>
              ) : filtered.map((event) => (
                <tr key={event.id} className='border-t border-borderSoft hover:bg-background/50'>
                  <td className='px-6 py-5'>
                    <p className='font-semibold text-dark'>{event.title}</p>
                    <p className='text-sm text-secondaryText'>{event.date} · {event.location}</p>
                  </td>
                  <td className='px-6 py-5 text-sm text-secondaryText'>{event.category}</td>
                  <td className='px-6 py-5'>
                    <Badge variant={BADGE_VARIANT[event.status] || 'info'}>{event.status || 'Published'}</Badge>
                  </td>
                  <td className='px-6 py-5 text-sm text-secondaryText'>
                    {registrations.filter((r) => r.eventId === event.id).length}
                  </td>
                  <td className='px-6 py-5'>
                    <div className='flex justify-end gap-2'>
                      <button onClick={() => setViewEvent(event)} className='flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft hover:bg-primarySoft' title='Peserta'><Users size={16} /></button>
                      <button onClick={() => openEdit(event)} className='flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft hover:bg-background'><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(event.id)} className='flex h-10 w-10 items-center justify-center rounded-2xl border border-red-200 text-red-500 hover:bg-red-50'><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm'>
          <div className='w-full max-w-lg rounded-[32px] bg-surface p-8 shadow-hover'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-black'>{editTarget ? 'Edit Event' : 'Buat Event Baru'}</h2>
              <button onClick={() => setShowModal(false)} className='flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft'><X size={18} /></button>
            </div>

            <div className='mt-6 space-y-4'>
              <MField label='Judul Event' value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder='Nama event...' />

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='mb-2 block text-sm font-bold text-dark'>Kategori</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-4 text-sm outline-none focus:border-primary'>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-bold text-dark'>Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                    className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-4 text-sm outline-none focus:border-primary'>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <MField label='Tanggal' type='date' value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
              <MField label='Lokasi' value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder='Gedung / ruangan...' />

              {formError && <p className='rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600'>{formError}</p>}

              <div className='flex gap-3 pt-2'>
                <button onClick={() => setShowModal(false)} className='flex-1 rounded-2xl border border-borderSoft py-3 font-semibold text-dark hover:bg-background'>Batal</button>
                <button onClick={handleSave} className='flex-1 rounded-2xl bg-primary py-3 font-semibold text-white hover:scale-[1.02]'>
                  {editTarget ? 'Simpan' : 'Publikasi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {viewEvent && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm'>
          <div className='w-full max-w-lg rounded-[32px] bg-surface p-8 shadow-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-black'>Peserta</h2>
                <p className='text-sm text-secondaryText'>{viewEvent.title} · {eventParticipants.length} orang</p>
              </div>
              <button onClick={() => setViewEvent(null)} className='flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft'><X size={18} /></button>
            </div>
            <div className='mt-6 max-h-[400px] space-y-3 overflow-y-auto pr-1'>
              {eventParticipants.length === 0 ? (
                <p className='py-8 text-center text-secondaryText'>Belum ada peserta.</p>
              ) : eventParticipants.map((reg) => (
                <div key={reg.id} className='flex items-center justify-between rounded-2xl border border-borderSoft bg-background px-5 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primarySoft font-bold text-primary'>
                      {reg.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className='font-semibold text-dark'>{reg.name}</p>
                      <p className='text-xs text-secondaryText'>{reg.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { if (!confirm(`Keluarkan ${reg.name}?`)) return; cancelRegistration(reg.eventId, reg.userId); load(); setViewEvent((p) => ({ ...p })) }}
                    className='rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50'
                  >
                    Keluarkan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </OrganizerLayout>
  )
}

function MField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className='mb-2 block text-sm font-bold text-dark'>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 text-sm outline-none focus:border-primary' />
    </div>
  )
}

export default OrganizerEvents
