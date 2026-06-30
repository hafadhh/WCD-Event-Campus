function RegisteredEvents({ events }) {
    if (events.length === 0) {
      return (
        <section className="w-full max-w-full overflow-hidden rounded-[28px] bg-[#f7f1e8] py-5">
          <div className="px-5">
            <h2 className="text-xl font-black text-dark">Registered Events</h2>
            <p className="mt-3 text-sm text-secondaryText">Belum ada event yang dibuat.</p>
          </div>
        </section>
      )
    }
  
    return (
      <section className="w-full max-w-full overflow-hidden rounded-[28px] bg-[#f7f1e8] py-5">
        <div className="mb-2 px-1">
          <h2 className="text-xl font-black text-dark">Registered Events</h2>
        </div>
  
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-event-marquee gap-4">
            {[...events, ...events].map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className="flex w-[430px] shrink-0 items-center gap-4 rounded-2xl px-5 py-4"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-32 w-48 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-dark">{event.title}</h3>
                  <p className="mt-2 truncate text-sm text-secondaryText">
                    {event.date} • {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default RegisteredEvents
  