import { ArrowRight, CalendarDays, Heart, MapPin, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({
  id,
  title,
  image,
  category,
  date,
  location,
  description,
  pic,
  progress
}) {
  return (
    <article className="group flex h-full min-h-[600px] flex-col overflow-hidden rounded-card border border-borderSoft bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-hover">
      <div className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-card border border-borderSoft bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-hover">
        <div className="relative h-52 shrink-0 overflow-hidden rounded-t-card">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-t-card object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
            {category}
          </div>

          <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 backdrop-blur-lg">
            <Heart size={18} />
          </span>
        </div>

        <div className="flex flex-1 flex-col space-y-5 p-6">
          <div>
            <h3 className="min-h-[78px] font-serif text-[25px] leading-[1] text-primaryText">
              {title}
            </h3>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-secondaryText">
              {description}
            </p>
          </div>

          <div className="mt-5 space-y-3 text-sm text-secondaryText">
            <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <UserRound size={18} />
            <span>{pic}</span>
          </div>
        </div>

          <div className="mt-auto">
            <div className="mb-2 flex justify-between text-sm">
              <span>Capacity</span>
              <span className="font-semibold text-primary">
                {progress}% Filled
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-primarySoft">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Link
              to={`/event/${id}`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-primaryText"
            >
              View Details
              <ArrowRight size={18} />
              </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
