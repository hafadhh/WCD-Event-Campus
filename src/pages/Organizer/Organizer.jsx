import { useEffect, useState } from 'react'
import OrganizerLayout from '../../layouts/OrganizerLayout/OrganizerLayout'
import StatCard from '../../components/cards/StatCard/StatCard'
import { getEvents, getRegistrations, createEvent, updateEvent, deleteEvent, cancelRegistration } from '../../data/store'
import { Pencil, Trash2, Plus, Users, X } from 'lucide-react'
import Badge from '../../components/ui/Badge/Badge'

function Organizer() {
  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null) // null = create, object = edit
  const [viewEvent, setViewEvent] = useState(null) // event to see participants
  const [form, setForm] = useState({ title: '', category: '', date: '', location: '', image: '' })
  const [formError, setFormError] = useState('')

  function load() {
    setEvents(getEvents())
    setRegistrations(getRegistrations())
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditTarget(null)
    setForm({ title: '', category: 'Workshop', date: '', location: '', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865' })
    setFormError('')
    setShowModal(true)
  }

  function openEdit(event) {
    setEditTarget(event)
    setForm({ title: event.title, category: event.category, date: event.date, location: event.location, image: event.image })
    setFormError('')
    setShowModal(true)
  }

  function handleSave() {
    if (!form.title || !form.date || !form.location) {
      setFormError('Judul, tanggal, dan lokasi wajib diisi.')
      return
    }
    if (editTarget) {
      updateEvent(editTarget.id, form)
    } else {
      createEvent(form)
    }
    setShowModal(false)
    load()
  }

  function handleDelete(id) {
    if (!confirm('Hapus event ini beserta semua data pendaftarannya?')) return
    deleteEvent(id)
    load()
  }

  const totalParticipants = registrations.length
  const publishedCount = events.filter((e) => e.status === 'Published').length

  const eventParticipants = viewEvent
    ? registrations.filter((r) => r.eventId === viewEvent.id)
    : []

  return (
    <OrganizerLayout title="Overview" subtitle="Kelola event dan peserta Universitas Cakrawala.">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Event" value={String(events.length)} description="Event yang sudah dibuat." />
        <StatCard title="Dipublikasi" value={String(publishedCount)} description="Event yang sedang aktif." />
        <StatCard title="Total Peserta" value={String(totalParticipants)} description="Pendaftar di semua event." />
      </div>

      {/* Event Table */}
      <section className="mt-10 rounded-[32px] border border-borderSoft bg-surface p-8 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-dark">Manajemen Event</h2>
            <p className="mt-1 text-secondaryText">Buat, edit, dan hapus event kampus.</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            <Plus size={18} />
            Event Baru
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-borderSoft">
          <table className="w-full border-collapse">
            <thead className="bg-background">
              <tr>
                {['Event', 'Status', 'Peserta', 'Aksi'].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-5 text-sm font-bold uppercase tracking-wide text-secondaryText ${h === 'Aksi' ? 'text-right' : 'text-left'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-borderSoft">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-dark">{event.title}</p>
                    <p className="text-sm text-secondaryText">{event.date} · {event.location}</p>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={event.status === 'Published' ? 'success' : 'warning'}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-secondaryText">
                    {registrations.filter((r) => r.eventId === event.id).length} peserta
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setViewEvent(event)}
                        title="Lihat Peserta"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft transition hover:bg-primarySoft"
                      >
                        <Users size={16} />
                      </button>
                      <button
                        onClick={() => openEdit(event)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft transition hover:bg-background"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[32px] bg-surface p-8 shadow-hover">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-dark">
                {editTarget ? 'Edit Event' : 'Buat Event Baru'}
              </h2>
              <button onClick={() => setShowModal(false)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <FormField label="Judul Event" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Nama event..." />
              
              <div>
                <label className="mb-2 block text-sm font-bold text-dark">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 text-sm outline-none focus:border-primary"
                >
                  {['Workshop', 'Music', 'Seminar', 'Competition', 'Career', 'Business', 'Art', 'Technology', 'Networking', 'Design'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <FormField label="Tanggal" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
              <FormField label="Lokasi" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder="Gedung / ruangan..." />

              {formError && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 rounded-2xl border border-borderSoft py-3 font-semibold text-dark hover:bg-background">
                  Batal
                </button>
                <button onClick={handleSave} className="flex-1 rounded-2xl bg-primary py-3 font-semibold text-white transition hover:scale-[1.02]">
                  {editTarget ? 'Simpan' : 'Publikasi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {viewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[32px] bg-surface p-8 shadow-hover">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-dark">Peserta</h2>
                <p className="mt-1 text-sm text-secondaryText">{viewEvent.title}</p>
              </div>
              <button onClick={() => setViewEvent(null)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6">
              {eventParticipants.length === 0 ? (
                <p className="py-8 text-center text-secondaryText">Belum ada peserta yang mendaftar.</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {eventParticipants.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between rounded-2xl border border-borderSoft bg-background px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primarySoft font-bold text-primary">
                          {reg.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-dark">{reg.name}</p>
                          <p className="text-xs text-secondaryText">{reg.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!confirm(`Keluarkan ${reg.name} dari event ini?`)) return
                          cancelRegistration(reg.eventId, reg.userId)
                          load()
                          setViewEvent((prev) => ({ ...prev })) // trigger re-render
                        }}
                        className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                      >
                        Keluarkan
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </OrganizerLayout>
  )
}

function FormField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-dark">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 text-sm outline-none focus:border-primary"
      />
    </div>
  )
}

export default Organizer
