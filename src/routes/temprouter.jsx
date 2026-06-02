import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'
import EventDetail from '../pages/EventDetail/EventDetail'
import Dashboard from '../pages/Dashboard/Dashboard'
import Organizer from '../pages/Organizer/Organizer'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/event/:id',
    element: <EventDetail />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/organizer',
    element: (
      <ProtectedRoute>
        <Organizer />
      </ProtectedRoute>
    )
  }
])