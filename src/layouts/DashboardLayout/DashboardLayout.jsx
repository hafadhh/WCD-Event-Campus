import { useState } from 'react'
import DashboardSidebar from '../../components/layout/DashboardSidebar/DashboardSidebar'
import DashboardTopbar from '../../components/layout/DashboardTopbar/DashboardTopbar'

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <main className='flex h-screen overflow-hidden bg-background'>
      <DashboardSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <section
        className={`flex flex-1 flex-col transition-all duration-75 ${
          collapsed ? 'ml-[96px]' : 'ml-[280px]'
        }`}
      >
        <DashboardTopbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className='flex-1 overflow-y-auto p-8'>
          {children}
        </div>
      </section>
    </main>
  )
}

export default DashboardLayout



// import DashboardSidebar from '../../components/layout/DashboardSidebar/DashboardSidebar'
// import DashboardTopbar from '../../components/layout/DashboardTopbar/DashboardTopbar'

// function DashboardLayout({ children }) {
//   return (
//     <main className='flex min-h-screen bg-background'>
//       <DashboardSidebar />

//       <section className='flex-1'>
//         <DashboardTopbar />

//         <div className='p-8'>
//           {children}
//         </div>
//       </section>
//     </main>
//   )
// }

// export default DashboardLayout