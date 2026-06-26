import { useState } from 'react'
import DashboardSidebar from '../../components/layout/DashboardSidebar/DashboardSidebar'
import DashboardTopbar from '../../components/layout/DashboardTopbar/DashboardTopbar'

function DashboardLayout({ children, pageTitle, pageSubtitle }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <section
        className={`flex flex-1 flex-col transition-all duration-500 ${
          collapsed ? 'ml-[96px]' : 'ml-[280px]'
        }`}
      >
        <DashboardTopbar pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </section>
    </main>
  )
}

export default DashboardLayout
