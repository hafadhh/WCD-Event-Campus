/**
 * Central localStorage store.
 * Keys:
 *   wcd_events        — array of event objects (source of truth, seeded from events.js)
 *   wcd_registrations — array of { id, eventId, userId, name, email, registeredAt }
 *   wcd_students      — array of student accounts (from auth)
 */

import { events as SEED_EVENTS } from './events'

// ─── EVENTS ──────────────────────────────────────────────────────────────────

export function getEvents() {
  try {
    const raw = localStorage.getItem('wcd_events')
    if (!raw) {
      // Seed on first load
      localStorage.setItem('wcd_events', JSON.stringify(SEED_EVENTS))
      return SEED_EVENTS
    }
    return JSON.parse(raw)
  } catch {
    return SEED_EVENTS
  }
}

export function saveEvents(events) {
  localStorage.setItem('wcd_events', JSON.stringify(events))
}

export function createEvent(eventData) {
  const events = getEvents()
  const newEvent = {
    ...eventData,
    id: Date.now(),
    participants: 0,
    progress: 0,
    status: 'Published',
  }
  events.unshift(newEvent)
  saveEvents(events)
  return newEvent
}

export function updateEvent(id, updates) {
  const events = getEvents()
  const idx = events.findIndex((e) => e.id === id)
  if (idx === -1) return null
  events[idx] = { ...events[idx], ...updates }
  saveEvents(events)
  return events[idx]
}

export function deleteEvent(id) {
  const events = getEvents().filter((e) => e.id !== id)
  saveEvents(events)
  // Also remove registrations for this event
  const regs = getRegistrations().filter((r) => r.eventId !== id)
  saveRegistrations(regs)
}

// ─── REGISTRATIONS ───────────────────────────────────────────────────────────

export function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem('wcd_registrations') || '[]')
  } catch {
    return []
  }
}

export function saveRegistrations(regs) {
  localStorage.setItem('wcd_registrations', JSON.stringify(regs))
}

export function registerForEvent({ eventId, userId, name, email }) {
  const regs = getRegistrations()
  // Prevent duplicate
  const already = regs.find((r) => r.eventId === eventId && r.userId === userId)
  if (already) return { success: false, error: 'Sudah terdaftar di event ini.' }

  const newReg = {
    id: `reg-${Date.now()}`,
    eventId,
    userId,
    name,
    email,
    registeredAt: new Date().toISOString(),
  }
  regs.push(newReg)
  saveRegistrations(regs)

  // Bump participant count
  const events = getEvents()
  const idx = events.findIndex((e) => e.id === eventId)
  if (idx !== -1) {
    events[idx].participants = (events[idx].participants || 0) + 1
    saveEvents(events)
  }

  return { success: true, registration: newReg }
}

export function cancelRegistration(eventId, userId) {
  const regs = getRegistrations().filter(
    (r) => !(r.eventId === eventId && r.userId === userId)
  )
  saveRegistrations(regs)

  // Decrement participant count
  const events = getEvents()
  const idx = events.findIndex((e) => e.id === eventId)
  if (idx !== -1) {
    events[idx].participants = Math.max(0, (events[idx].participants || 1) - 1)
    saveEvents(events)
  }
}

export function getRegistrationsByUser(userId) {
  return getRegistrations().filter((r) => r.userId === userId)
}

export function getRegistrationsByEvent(eventId) {
  return getRegistrations().filter((r) => r.eventId === eventId)
}

export function isRegistered(eventId, userId) {
  return getRegistrations().some((r) => r.eventId === eventId && r.userId === userId)
}
