import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function DashboardTopbar({
  title = 'Dashboard',
  subtitle = 'Welcome back, explore your campus activity.',
  hideTitle = false,
  onSearch,
}) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header
      className={`relative flex h-24 items-center bg-transparent px-8 ${
        hideTitle ? 'justify-end' : 'justify-between'
      }`}
    >
      {!hideTitle && (
        <div>
          <h1 className="text-3xl font-black text-dark">{title}</h1>
          <p className="text-softText">{subtitle}</p>
        </div>
      )}

      {/* Search bar — dipusatkan terhadap seluruh header (absolute), bukan flex anak */}
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="flex h-12 w-[320px] items-center rounded-2xl border border-borderSoft bg-background px-4 lg:w-[420px]">
          <Search className="text-softText" size={18} />
          <input
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-full flex-1 bg-transparent px-3 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-borderSoft bg-white">
          <Bell />
        </button>

        <button
          onClick={handleLogout}
          className="rounded-2xl border border-borderSoft bg-white px-5 py-3 font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardTopbar