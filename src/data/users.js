export const ORGANIZER_ACCOUNTS = [
  {
    id: 'org-1',
    name: 'Admin Kampus',
    email: 'admin@campus.com',
    password: 'admin123',
    role: 'organizer',
  },
  {
    id: 'org-2',
    name: 'Budi Organizer',
    email: 'budi@campus.com',
    password: 'budi123',
    role: 'organizer',
  },
]

export function getStudents() {
  try {
    return JSON.parse(localStorage.getItem('wcd_students') || '[]')
  } catch {
    return []
  }
}

export function saveStudent(student) {
  const students = getStudents()
  students.push(student)
  localStorage.setItem('wcd_students', JSON.stringify(students))
}

export function findUserByEmail(email) {
  const organizer = ORGANIZER_ACCOUNTS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (organizer) return organizer

  const students = getStudents()
  return students.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
}
