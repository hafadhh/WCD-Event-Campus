import { Bell, Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";


function DashboardTopbar() {
  const { logout } = useAuth();
  return (
    <header className="flex h-24 items-center justify-between border-b border-borderSoft bg-white px-8">
      <div>
        <h1 className="text-3xl font-black text-dark">Dashboard</h1>

        <p className="mt-1 text-base text-softText">
          Welcome back, explore your campus activity.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex h-14 w-[320px] items-center rounded-2xl border border-borderSoft bg-background px-4">
          <Search className="text-softText" />

          <input
            placeholder="Search..."
            className="h-full flex-1 bg-transparent px-3 outline-none"
          />
        </div>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-borderSoft bg-white">
          <Bell />
        </button>

        <img
          src="https://i.pravatar.cc/150"
          className="h-14 w-14 rounded-2xl object-cover"
        />
        <button
          onClick={logout}
          className="rounded-2xl border border-borderSoft px-5 py-3 font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardTopbar;
