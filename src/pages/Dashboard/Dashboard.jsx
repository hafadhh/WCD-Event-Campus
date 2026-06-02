import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import StatCard from '../../components/cards/StatCard/StatCard'
import EventCard from '../../components/cards/EventCard/EventCard'
import { events } from '../../data/events'
import { useState } from 'react'

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false) 
  return (
    <DashboardLayout>
      <div className='grid gap-6 md:grid-cols-3'>
        <StatCard
          title='Joined Events'
          value='24'
          description='Events you have participated in this semester.'
        />

        <StatCard
          title='Bookmarks'
          value='12'
          description='Saved events waiting for registration.'
        />

        <StatCard
          title='Organizations'
          value='5'
          description='Communities and clubs you follow.'
        />
      </div>

      <div className='mt-14'>
        <div className='flex items-center justify-between'>
          <h2 className='text-4xl font-black'>
            Upcoming Events
          </h2>

          <button className='rounded-2xl border border-borderSoft bg-white px-5 py-3 font-semibold'>
            View All
          </button>
        </div>

        <div className='mt-8 grid gap-8 xl:grid-cols-3'>
          {events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard