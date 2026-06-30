import { useState } from 'react'
import DashboardSidebar from '../../components/layout/DashboardSidebar/DashboardSidebar'
import DashboardTopbar from '../../components/layout/DashboardTopbar/DashboardTopbar'

function DashboardLayout({
  children,
  title = 'Dashboard',
  subtitle = 'Welcome back, explore your campus activity.',
  hideTitle = false,
  onSearch,
}) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

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

export default DashboardLayout
