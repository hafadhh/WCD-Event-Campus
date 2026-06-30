import { useEffect, useState, useMemo } from 'react'
import OrganizerLayout from '../../layouts/OrganizerLayout/OrganizerLayout'
import OrganizerStats from '../../components/sections/OrganizerStats/OrganizerStats'
import EventManagementTable from '../../components/sections/EventManagementTable/EventManagementTable'
import CreateEventBanner from '../../components/sections/CreateEventBanner/CreateEventBanner'
import RegisteredEvents from '../../components/sections/RegisteredEvents/RegisteredEvents'
import EventFormModal from '../../components/sections/EventFormModal/EventFormModal'
import ParticipantsModal from '../../components/sections/ParticipantsModal/ParticipantsModal'
import {
  getEvents, getRegistrations, createEvent, updateEvent, deleteEvent, cancelRegistration,
} from '../../data/store'

function Organizer() {
  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)

  function load() {
    setEvents(getEvents())
    setRegistrations(getRegistrations())
  }
  useEffect(() => { load() }, [])

  function openCreate() { setEditTarget(null); setShowModal(true) }
  function openEdit(event) { setEditTarget(event); setShowModal(true) }

  function handleSave(formData) {
    if (editTarget) updateEvent(editTarget.id, formData)
    else createEvent(formData)
    setShowModal(false)
    load()
  }

  function handleDelete(id) {
    if (!confirm('Hapus event ini beserta semua pendaftarannya?')) return
    deleteEvent(id)
    load()
  }

  function handleKick(reg) {
    if (!confirm(`Keluarkan ${reg.name}?`)) return
    cancelRegistration(reg.eventId, reg.userId)
    load()
    setViewEvent((prev) => ({ ...prev }))
  }

  const upcomingCount = useMemo(() => {
    const now = new Date()
    const limit = new Date(now)
    limit.setDate(limit.getDate() + 30)
    return events.filter((e) => {
      const d = new Date(e.date.replace(',', '').split(' ').reverse().join('-'))
      return !isNaN(d) && d >= now && d <= limit
    }).length
  }, [events])

  const eventParticipants = viewEvent
    ? registrations.filter((r) => r.eventId === viewEvent.id)
    : []

  return (
    <OrganizerLayout hideTitle>
      <div className="min-w-0 space-y-8 overflow-hidden">
        <CreateEventBanner onCreate={openCreate} />

        <RegisteredEvents events={events} />

        <OrganizerStats
          totalEvents={events.length}
          totalParticipants={registrations.length}
          upcomingEvents={upcomingCount}
        />

        <EventManagementTable
          events={events}
          onCreate={openCreate}
          onEdit={openEdit}
          onDelete={handleDelete}
          onViewParticipants={setViewEvent}
        />

        <EventFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editTarget={editTarget}
        />

        <ParticipantsModal
          isOpen={!!viewEvent}
          onClose={() => setViewEvent(null)}
          event={viewEvent}
          participants={eventParticipants}
          onKick={handleKick}
        />
      </div>
    </OrganizerLayout>
  )
}

export default Organizer
