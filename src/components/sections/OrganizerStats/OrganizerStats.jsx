import StatCard from '../../cards/StatCard/StatCard'

function OrganizerStats() {
  return (
    <section className='grid gap-6 md:grid-cols-3'>
      <StatCard
        title='Total Events'
        value='18'
        description='Events published this semester.'
      />

      <StatCard
        title='Participants'
        value='1.2K'
        description='Total registered participants.'
      />

      <StatCard
        title='Revenue'
        value='$4.8K'
        description='Revenue generated from paid events.'
      />
    </section>
  )
}

export default OrganizerStats