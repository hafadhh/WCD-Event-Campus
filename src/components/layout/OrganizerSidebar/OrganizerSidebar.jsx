import {
    LayoutDashboard,
    CalendarDays,
    Users,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
  } from 'lucide-react'
  import { useAuth } from '../../../context/AuthContext'
  import { useNavigate, useLocation } from 'react-router-dom'
  
  const MENUS = [
    { icon: LayoutDashboard, label: 'Overview',     path: '/organizer' },
    { icon: CalendarDays,    label: 'Events',        path: '/organizer/events' },
    { icon: Users,           label: 'Participants',  path: '/organizer/participants' },
  ]
  
  function OrganizerSidebar({ collapsed, setCollapsed }) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
  
    function handleLogout() {
      logout()
      navigate('/login', { replace: true })
    }
  
    return (
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-borderSoft bg-surface transition-all duration-500 ${
          collapsed ? 'w-[96px]' : 'w-[280px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          {!collapsed && (
            <h1 className="text-2xl font-black text-primary">CampusPulse</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl transition hover:bg-primarySoft"
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>
  
        {!collapsed && (
          <div className="mx-4 rounded-2xl bg-primarySoft px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Admin Panel
            </p>
          </div>
        )}
  
        {/* Nav */}
        <nav className="mt-6 space-y-2 px-4">
          {MENUS.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex h-14 w-full items-center gap-4 rounded-2xl px-5 font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-secondaryText hover:bg-primary hover:text-white'
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
  
        {/* Logout */}
        <div className="mt-auto px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex h-14 w-full items-center gap-4 rounded-2xl px-5 font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    )
  }
  
  export default OrganizerSidebar
  