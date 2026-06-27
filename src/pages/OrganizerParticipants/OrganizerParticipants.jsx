import { useEffect, useState, useMemo } from 'react'
import OrganizerLayout from '../../layouts/OrganizerLayout/OrganizerLayout'
import { getRegistrations, getEvents, cancelRegistration } from '../../data/store'
import { Search } from 'lucide-react'

function OrganizerParticipants() {
  const [registrations, setRegistrations] = useState([])
  const [events, setEvents] = useState([])
  const [filterEvent, setFilterEvent] = useState('all')
  const [search, setSearch] = useState('')

  function load() {
    setRegistrations(getRegistrations())
    setEvents(getEvents())
  }
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    let list = filterEvent === 'all'
      ? registrations
      : registrations.filter((r) => r.eventId === Number(filterEvent))

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
    }
    return list
  }, [registrations, filterEvent, search])

  function handleKick(reg) {
    if (!confirm(`Keluarkan ${reg.name}?`)) return
    cancelRegistration(reg.eventId, reg.userId)
    load()
  }

  function getEventTitle(eventId) {
    return events.find((e) => e.id === eventId)?.title || '—'
  }

  return (
    <OrganizerLayout title='Participants' subtitle='Semua peserta yang terdaftar di event.'>
      <div className='rounded-[32px] border border-borderSoft bg-surface p-8'>

        {/* Header + controls */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-black text-dark'>Semua Peserta</h2>
            <p className='mt-1 text-sm text-secondaryText'>{filtered.length} pendaftar</p>
          </div>
          <div className='flex gap-3'>
            <div className='flex h-11 items-center gap-2 rounded-2xl border border-borderSoft bg-background px-4'>
              <Search size={16} className='text-secondaryText' />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Cari nama / email...'
                className='w-44 bg-transparent text-sm outline-none'
              />
            </div>
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className='h-11 rounded-2xl border border-borderSoft bg-background px-4 text-sm outline-none focus:border-primary'
            >
              <option value='all'>Semua Event</option>
              {events.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
            </select>
          </div>
        </div>

        {/* Table / empty state */}
        <div className='mt-8'>
          {filtered.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-3xl border border-borderSoft bg-background py-20 text-center'>
              <p className='text-xl font-black text-dark'>Tidak ada peserta</p>
              <p className='mt-2 text-sm text-secondaryText'>
                {search ? 'Tidak ada hasil untuk pencarian ini.' : 'Belum ada pendaftar.'}
              </p>
            </div>
          ) : (
            <div className='overflow-hidden rounded-3xl border border-borderSoft'>
              <table className='w-full border-collapse'>
                <thead className='bg-background'>
                  <tr>
                    {['Peserta', 'Event', 'Tanggal Daftar', 'Aksi'].map((h) => (
                      <th key={h} className={`px-6 py-5 text-sm font-bold uppercase tracking-wide text-secondaryText ${h === 'Aksi' ? 'text-right' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg) => (
                    <tr key={reg.id} className='border-t border-borderSoft hover:bg-background/50'>
                      <td className='px-6 py-5'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primarySoft font-bold text-primary'>
                            {reg.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className='font-semibold text-dark'>{reg.name}</p>
                            <p className='text-xs text-secondaryText'>{reg.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-5 text-sm font-medium text-dark'>{getEventTitle(reg.eventId)}</td>
                      <td className='px-6 py-5 text-sm text-secondaryText'>
                        {new Date(reg.registeredAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </td>
                      <td className='px-6 py-5 text-right'>
                        <button
                          onClick={() => handleKick(reg)}
                          className='rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50'
                        >
                          Keluarkan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </OrganizerLayout>
  )
}

export default OrganizerParticipants