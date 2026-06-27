import { events as SEED_EVENTS } from './events'

const EVENTS_KEY = 'wcd_events'
const REGS_KEY = 'wcd_registrations'
const SEED_VERSION = 'v4' // bump ini kalau mau reset seed

// ─── EVENTS ──────────────────────────────────────────────────────────────────

export function getEvents() {
  try {
    const version = localStorage.getItem('wcd_seed_version')
    if (version !== SEED_VERSION) {
      // Seed baru — reset events ke data terbaru, jaga registrasi
      localStorage.setItem(EVENTS_KEY, JSON.stringify(SEED_EVENTS))
      localStorage.setItem('wcd_seed_version', SEED_VERSION)
      return SEED_EVENTS
    }
    const raw = localStorage.getItem(EVENTS_KEY)
    return raw ? JSON.parse(raw) : SEED_EVENTS
  } catch {
    return SEED_EVENTS
  }
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
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
  saveEvents(getEvents().filter((e) => e.id !== id))
  saveRegistrations(getRegistrations().filter((r) => r.eventId !== id))
}

// ─── REGISTRATIONS ───────────────────────────────────────────────────────────

export function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(REGS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveRegistrations(regs) {
  localStorage.setItem(REGS_KEY, JSON.stringify(regs))
}

export function registerForEvent({ eventId, userId, name, email }) {
  const regs = getRegistrations()
  if (regs.find((r) => r.eventId === eventId && r.userId === userId)) {
    return { success: false, error: 'Kamu sudah terdaftar di event ini.' }
  }

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

  // Increment participant count
  const evs = getEvents()
  const idx = evs.findIndex((e) => e.id === eventId)
  if (idx !== -1) {
    evs[idx].participants = (evs[idx].participants || 0) + 1
    saveEvents(evs)
  }

  return { success: true, registration: newReg }
}

export function cancelRegistration(eventId, userId) {
  saveRegistrations(
    getRegistrations().filter(
      (r) => !(r.eventId === eventId && r.userId === userId)
    )
  )
  // Decrement
  const evs = getEvents()
  const idx = evs.findIndex((e) => e.id === eventId)
  if (idx !== -1) {
    evs[idx].participants = Math.max(0, (evs[idx].participants || 1) - 1)
    saveEvents(evs)
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

// ─── BOOKMARKS ───────────────────────────────────────────────────────────────

const BM_KEY = 'wcd_bookmarks'

export function getBookmarks(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(BM_KEY) || '{}')
    return all[userId] || []
  } catch {
    return []
  }
}

export function toggleBookmark(userId, eventId) {
  try {
    const all = JSON.parse(localStorage.getItem(BM_KEY) || '{}')
    const userBm = all[userId] || []
    const idx = userBm.indexOf(eventId)
    if (idx === -1) {
      all[userId] = [...userBm, eventId]
    } else {
      all[userId] = userBm.filter((id) => id !== eventId)
    }
    localStorage.setItem(BM_KEY, JSON.stringify(all))
    return all[userId]
  } catch {
    return []
  }
}

export function isBookmarked(userId, eventId) {
  return getBookmarks(userId).includes(eventId)
}
