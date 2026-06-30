import { Pencil, Trash2, Users } from 'lucide-react'
import Badge from '../../ui/Badge/Badge'

const BADGE_VARIANT = {
  Published: 'success',
  Draft: 'warning',
  Ongoing: 'info',
  Selesai: 'danger',
}

function EventManagementTable({ events, onCreate, onEdit, onDelete, onViewParticipants }) {
  return (
    <section className="rounded-[32px] border border-borderSoft bg-white p-8 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-dark">Event Management</h2>
          <p className="mt-2 text-softText">Monitor and manage your published events.</p>
        </div>

        <button
          onClick={onCreate}
          className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          New Event
        </button>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-borderSoft">
        <table className="w-full border-collapse">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">Event</th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">Status</th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">Participants</th>
              <th className="px-6 py-5 text-right text-sm font-bold uppercase tracking-wide text-softText">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-softText">
                  Belum ada event. Klik "New Event" untuk membuat.
                </td>
              </tr>
            ) : events.map((event) => (
              <tr key={event.id} className="border-t border-borderSoft">
                <td className="px-6 py-5">
                  <p className="font-semibold text-dark">{event.title}</p>
                  <p className="mt-1 text-sm text-softText">{event.date} · {event.location}</p>
                </td>

                <td className="px-6 py-5">
                  <Badge variant={BADGE_VARIANT[event.status] || 'info'}>
                    {event.status || 'Published'}
                  </Badge>
                </td>

                <td className="px-6 py-5 text-softText">{event.participants}</td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onViewParticipants(event)}
                      title="Lihat Peserta"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft hover:bg-primarySoft"
                    >
                      <Users size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(event)}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft hover:bg-background"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EventManagementTable
