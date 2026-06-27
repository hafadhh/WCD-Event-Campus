import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'
import EventDetail from '../pages/EventDetail/EventDetail'
import Dashboard from '../pages/Dashboard/Dashboard'
import Organizer from '../pages/Organizer/Organizer'
import OrganizerEvents from '../pages/OrganizerEvents/OrganizerEvents'
import OrganizerParticipants from '../pages/OrganizerParticipants/OrganizerParticipants'
import Settings from '../pages/Settings/Settings'
import MyEvents from '../pages/MyEvents/MyEvents'
import Bookmarks from '../pages/Bookmarks/Bookmarks'
import ProtectedRoute from './ProtectedRoute'

const student = (element) => (
  <ProtectedRoute requiredRole='student'>{element}</ProtectedRoute>
)
const organizer = (element) => (
  <ProtectedRoute requiredRole='organizer'>{element}</ProtectedRoute>
)

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/event/:id', element: <EventDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // Student routes
  { path: '/dashboard', element: student(<Dashboard />) },
  { path: '/dashboard/my-events', element: student(<MyEvents />) },
  { path: '/dashboard/bookmarks', element: student(<Bookmarks />) },
  { path: '/dashboard/settings', element: student(<Settings />) },

  // Organizer routes
  { path: '/organizer', element: organizer(<Organizer />) },
  { path: '/organizer/events', element: organizer(<OrganizerEvents />) },
  { path: '/organizer/participants', element: organizer(<OrganizerParticipants />) },
])
