import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({
  id,
  title,
  image,
  category,
  date,
  location,
  progress
}) {
  return (
    <Link to={`/event/${id}`}>
      <div className="rounded-card border border-borderSoft bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-hover">
      {/* <div className="group overflow-hidden rounded-[30px] border border-borderSoft bg-white shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-soft"> */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
            {category}
          </div>

          <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 backdrop-blur-lg">
            <Heart size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm font-semibold text-primary">{date}</p>

            <h3 className="mt-3 font-serif text-[25px] leading-[1] text-dark">
            {/* <h3 className="mt-3 text-2xl font-bold leading-snug text-dark"> */}
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-softText">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Capacity</span>
              <span className="font-semibold text-primary">
                {progress}% Filled
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
