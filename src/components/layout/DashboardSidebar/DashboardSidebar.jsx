import {
  CalendarDays,
  Compass,
  Bookmark,
  Settings,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'

function DashboardSidebar({ collapsed, setCollapsed }) {
  const menus = [
    {
      icon: LayoutDashboard,
      label: 'Overview'
    },
    {
      icon: Compass,
      label: 'Discover'
    },
    {
      icon: CalendarDays,
      label: 'My Events'
    },
    {
      icon: Bookmark,
      label: 'Bookmarks'
    },
    {
      icon: Settings,
      label: 'Settings'
    }
  ]

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-borderSoft bg-surface transition-all duration-500 ${
        collapsed ? 'w-[96px]' : 'w-[280px]'
      }`}
    >
      <div className='flex items-center justify-between p-6'>
        {!collapsed && (
          <h1 className='text-3xl font-black text-primary'>
            CampusPulse
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className='flex h-11 w-11 items-center justify-center rounded-2xl transition hover:bg-primarySoft'
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className='mt-10 space-y-3 px-4'>
        {menus.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.label}
              className='flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-secondaryText transition-all duration-300 hover:bg-primary hover:text-white'
            >
              <Icon size={20} />

              {!collapsed && (
                <span className='font-semibold'>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {!collapsed && (
        <div className="mt-auto p-4">
          <div className="rounded-[28px] border border-[#eee6dc] bg-white p-6 shadow-[0_18px_45px_rgba(48,39,30,0.10)]">
            <h3 className="text-lg font-black text-primaryText">
              Premium Access
            </h3>

            <p className="mt-3 text-xs leading-relaxed text-secondaryText">
              Unlock advanced campus analytics and recommendations.
            </p>

            <button className="mt-5 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:scale-[1.03]">
              Upgrade
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default DashboardSidebar

// import {
//     CalendarDays,
//     Compass,
//     Bookmark,
//     Settings,
//     LayoutDashboard
//   } from 'lucide-react'
  
//   function DashboardSidebar() {
//     const menus = [
//       {
//         icon: LayoutDashboard,
//         label: 'Overview'
//       },
//       {
//         icon: Compass,
//         label: 'Discover'
//       },
//       {
//         icon: CalendarDays,
//         label: 'My Events'
//       },
//       {
//         icon: Bookmark,
//         label: 'Bookmarks'
//       },
//       {
//         icon: Settings,
//         label: 'Settings'
//       }
//     ]
  
//     return (
//       <aside className='flex w-[280px] flex-col border-r border-borderSoft bg-white p-6'>
//         <div>
//           <h1 className='text-3xl font-black text-primary'>
//             CampusPulse
//           </h1>
//         </div>
  
//         <div className='mt-14 space-y-3'>
//           {menus.map((item) => {
//             const Icon = item.icon
  
//             return (
//               <button
//                 key={item.label}
//                 className='flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-softText transition hover:bg-primary hover:text-white'
//               >
//                 <Icon size={20} />
  
//                 <span className='font-semibold'>
//                   {item.label}
//                 </span>
//               </button>
//             )
//           })}
//         </div>
  
//         <div className='mt-auto rounded-[28px] bg-heroGradient p-6'>
//           <h3 className='text-xl font-black text-dark'>
//             Premium Access
//           </h3>
  
//           <p className='mt-3 text-sm leading-relaxed text-softText'>
//             Unlock advanced campus analytics and recommendations.
//           </p>
  
//           <button className='mt-5 rounded-2xl bg-primary px-5 py-3 font-semibold text-white'>
//             Upgrade
//           </button>
//         </div>
//       </aside>
//     )
//   }
  
//   export default DashboardSidebar