import { Bell, Heart } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-borderSoft/40 bg-background/80 backdrop-blur-xl">
      {/* <header className='sticky top-0 z-50 border-b border-borderSoft bg-white/70 backdrop-blur-xl'> */}
      <div className="mx-auto flex items-center justify-between py-5 h-20 max-w-7xl px-6 ">
        <h1 className="text-3xl font-black text-primary">CampusPulse</h1>

        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-wide text-secondaryText transition duration-500 hover:text-primaryText">
          {/* <nav className='hidden items-center gap-10 text-[15px] font-medium md:flex'> */}
          <a className="text-primary">Discover</a>
          <a>My Events</a>
          <a>Organizations</a>
          <a>Map</a>
        </nav>

        <div className="flex items-center gap-5">
          <Bell size={22} />
          <Heart size={22} />

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="h-11 w-11 rounded-full object-cover border border-borderSoft shadow-soft"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
