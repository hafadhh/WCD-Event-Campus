import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/sections/Hero/Hero";
import EventCard from "../../components/cards/EventCard/EventCard";
import FilterSidebar from "../../components/layout/FilterSidebar/FilterSidebar";
import Footer from '../../components/layout/Footer/Footer'
import { events } from '../../data/events'

// const events = [
//   {
//     title: "AI Future Proofing Workshop",
//     image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
//     category: "Workshop",
//     date: "24 OCT, 2026",
//     location: "Auditorium A",
//     progress: 85,
//   },
//   {
//     title: "Autumn Jazz Rooftop",
//     image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
//     category: "Music",
//     date: "25 OCT, 2026",
//     location: "Sky Deck Lounge",
//     progress: 42,
//   },
//   {
//     title: "Annual Tech Career Fair",
//     image: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
//     category: "Career",
//     date: "28 OCT, 2026",
//     location: "Grand Hall",
//     progress: 95,
//   },
// ];

function Home() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[320px_1fr]">
        <FilterSidebar />

        <div>
          <Hero />

          <div className="mt-16 flex items-center justify-between">
            <h2 className="text-4xl font-black">Found 12 Events</h2>

            <button className="rounded-full border border-borderSoft bg-white px-5 py-3 font-medium shadow-sm">
              Most Relevant
            </button>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* <section className='mx-auto max-w-7xl px-6 py-10'>
        <Hero />

        <div className='mt-16 flex items-center justify-between'>
          <h2 className='text-4xl font-black'>Found 12 Events</h2>

          <button className='rounded-full border border-borderSoft bg-white px-5 py-3 font-medium shadow-sm'>
            Most Relevant
          </button>
        </div>

        <div className='mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section> */}
      <Footer />
    </main>
  );
}

export default Home;
