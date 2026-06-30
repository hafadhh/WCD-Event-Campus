import StatCard from '../../cards/StatCard/StatCard'

function OrganizerStats({ totalEvents, totalParticipants, upcomingEvents }) {
  return (
    <section className='grid gap-6 md:grid-cols-3'>
      <StatCard
        title='Total Events'
        value={String(totalEvents)}
        description='Events published this semester.'
      />

      <StatCard
        title='Participants'
        value={String(totalParticipants)}
        description='Total registered participants.'
      />

      <StatCard
        title='Upcoming'
        value={String(upcomingEvents)}
        description='Events scheduled in the next 30 days.'
      />
    </section>
  )
}

export default OrganizerStats
