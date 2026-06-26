import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'
import EventDetail from '../pages/EventDetail/EventDetail'
import Dashboard from '../pages/Dashboard/Dashboard'
import Organizer from '../pages/Organizer/Organizer'
import Settings from '../pages/Settings/Settings'
import MyEvents from '../pages/MyEvents/MyEvents'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/event/:id',
    element: <EventDetail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="student">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/my-events',
    element: (
      <ProtectedRoute requiredRole="student">
        <MyEvents />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/settings',
    element: (
      <ProtectedRoute requiredRole="student">
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/organizer',
    element: (
      <ProtectedRoute requiredRole="organizer">
        <Organizer />
      </ProtectedRoute>
    ),
  },
])
