import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

function DashboardTopbar({ pageTitle = 'Dashboard', pageSubtitle = 'Welcome back, explore your campus activity.' }) {
  const { user } = useAuth()

  return (
    <header className="flex h-24 items-center justify-between border-b border-borderSoft bg-surface px-8">
      <div>
        <h1 className="text-3xl font-black text-dark">{pageTitle}</h1>
        <p className="mt-1 text-base text-secondaryText">{pageSubtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-[280px] items-center rounded-2xl border border-borderSoft bg-background px-4">
          <Search size={18} className="text-secondaryText" />
          <input
            placeholder="Search events..."
            className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
          />
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft bg-surface">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-dark">{user?.name}</p>
            <p className="text-xs text-secondaryText">Mahasiswa</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft font-black text-primary">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardTopbar
