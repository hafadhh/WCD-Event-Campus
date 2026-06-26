import { Bell, Heart, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-borderSoft/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/">
          <h1 className="text-3xl font-black text-primary">CampusPulse</h1>
        </Link>

        <nav className="hidden items-center gap-10 text-[15px] font-medium text-secondaryText md:flex">
          <Link to="/" className="text-primary">
            Discover
          </Link>
          {user && (
            <Link to="/dashboard/my-events">My Events</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft">
                <Bell size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-borderSoft">
                <Heart size={18} />
              </button>

              {/* Avatar + dropdown */}
              <div className="relative group">
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-primarySoft font-black text-primary border border-borderSoft">
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-14 hidden w-52 rounded-2xl border border-borderSoft bg-surface p-2 shadow-hover group-focus-within:block group-hover:block">
                  <div className="px-3 py-2">
                    <p className="font-bold text-dark text-sm">{user.name}</p>
                    <p className="text-xs text-secondaryText">{user.email}</p>
                  </div>
                  <div className="my-1 border-t border-borderSoft" />
                  {user.role === 'organizer' ? (
                    <Link
                      to="/organizer"
                      className="flex w-full rounded-xl px-3 py-2 text-sm font-medium text-dark hover:bg-background"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="flex w-full rounded-xl px-3 py-2 text-sm font-medium text-dark hover:bg-background"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              <LogIn size={16} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
