import { useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar/Navbar'
import Footer from '../../components/layout/Footer/Footer'
import { events } from '../../data/events'
import { CalendarDays, Clock3, MapPin, Users } from 'lucide-react'

function EventDetail() {
  const { id } = useParams()

  const event = events.find((item) => item.id === Number(id))

  return (
    <main>
      <Navbar />

      <section className='mx-auto max-w-7xl px-6 py-10'>
        <div className='overflow-hidden rounded-[40px] shadow-soft'>
          <img
            src={event.image}
            className='h-[500px] w-full object-cover'
          />
        </div>

        <div className='mt-10 grid gap-10 lg:grid-cols-[1fr_360px]'>
          {/* LEFT */}
          <div>
            <div className='inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black'>
              {event.category}
            </div>

            <h1 className='mt-6 text-6xl font-black leading-tight text-dark'>
              {event.title}
            </h1>

            <p className='mt-8 text-lg leading-relaxed text-softText'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, tempora. Reiciendis rerum nemo accusantium deserunt
              nisi vero at dolorum molestiae.
            </p>

            <div className='mt-12 grid gap-6 md:grid-cols-2'>
              <div className='rounded-[28px] border border-borderSoft bg-white p-6 shadow-card'>
                <CalendarDays className='text-primary' />

                <h3 className='mt-4 text-lg font-bold'>Date</h3>

                <p className='mt-2 text-softText'>
                  October 24, 2026
                </p>
              </div>

              <div className='rounded-[28px] border border-borderSoft bg-white p-6 shadow-card'>
                <Clock3 className='text-primary' />

                <h3 className='mt-4 text-lg font-bold'>Time</h3>

                <p className='mt-2 text-softText'>
                  14:00 - 17:00
                </p>
              </div>

              <div className='rounded-[28px] border border-borderSoft bg-white p-6 shadow-card'>
                <MapPin className='text-primary' />

                <h3 className='mt-4 text-lg font-bold'>Location</h3>

                <p className='mt-2 text-softText'>
                  {event.location}
                </p>
              </div>

              <div className='rounded-[28px] border border-borderSoft bg-white p-6 shadow-card'>
                <Users className='text-primary' />

                <h3 className='mt-4 text-lg font-bold'>Capacity</h3>

                <p className='mt-2 text-softText'>
                  {event.progress}% filled
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className='sticky top-28 rounded-[32px] border border-borderSoft bg-white p-8 shadow-soft'>
              <h2 className='text-3xl font-black'>
                Register Event
              </h2>

              <p className='mt-4 leading-relaxed text-softText'>
                Secure your seat before registration closes.
              </p>

              <button className='mt-8 w-full rounded-2xl bg-primary py-5 text-lg font-bold text-stone-900 transition hover:scale-[1.02]'>
                Register Now
              </button>

              <div className='mt-8'>
                <div className='mb-3 flex justify-between text-sm'>
                  <span>Capacity</span>

                  <span className='font-semibold text-primary'>
                    {event.progress}% Filled
                  </span>
                </div>

                <div className='h-3 overflow-hidden rounded-full bg-secondary'>
                  <div
                    className='h-full rounded-full bg-primary'
                    style={{
                      width: `${event.progress}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default EventDetail