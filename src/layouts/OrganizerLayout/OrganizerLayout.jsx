import { useState } from 'react'
import OrganizerSidebar from '../../components/layout/OrganizerSidebar/OrganizerSidebar'
import { useAuth } from '../../context/AuthContext'

function OrganizerLayout({ children, title = 'Dashboard', subtitle }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <OrganizerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <section
        className={`flex flex-1 flex-col transition-all duration-500 ${
          collapsed ? 'ml-[96px]' : 'ml-[280px]'
        }`}
      >
        {/* Topbar */}
        <header className="flex h-24 items-center justify-between border-b border-borderSoft bg-surface px-8">
          <div>
            <h1 className="text-3xl font-black text-dark">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-base text-secondaryText">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-dark">{user?.name}</p>
              <p className="text-sm text-secondaryText">Administrator</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primarySoft font-black text-primary text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </section>
    </main>
  )
}

export default OrganizerLayout
