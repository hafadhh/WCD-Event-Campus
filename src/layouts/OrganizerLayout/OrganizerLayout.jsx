import { useState } from 'react'
import OrganizerSidebar from '../../components/layout/OrganizerSidebar/OrganizerSidebar'
import DashboardTopbar from '../../components/layout/DashboardTopbar/DashboardTopbar'

function OrganizerLayout({
  children,
  title = 'Dashboard',
  subtitle,
  hideTitle = false,
  onSearch,
}) {
  const [collapsed, setCollapsed] = useState(true) // default tertutup

  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <OrganizerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <section
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          collapsed ? 'ml-[96px]' : 'ml-[280px]'
        }`}
      >
        <DashboardTopbar
          title={title}
          subtitle={subtitle}
          hideTitle={hideTitle}
          onSearch={onSearch}
        />

        <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </div>
      </section>
    </main>
  )
}

export default OrganizerLayout
