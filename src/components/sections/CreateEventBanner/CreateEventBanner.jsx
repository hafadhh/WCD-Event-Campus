import {
  CalendarPlus,
  ClipboardList,
  ShieldCheck,
  UsersRound
} from "lucide-react";

function CreateEventBanner({ onCreate }) {
  return (
    <section className="relative mx-auto min-h-[360px] max-w-6xl overflow-hidden rounded-[36px] bg-white p-8 shadow-[0_24px_35px_-18px_rgba(48,39,30,0.28)]">
      <div className="absolute right-8 top-8 rounded-full border border-[#d8cdbf] bg-white/70 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-primary backdrop-blur">
        Admin Mode
      </div>

      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-white">
          <ShieldCheck size={18} className="text-white" />
          Organizer Control Panel
        </p>

        <h1 className="mt-5 text-5xl font-black leading-tight text-dark">
          Campus event command center.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-softText">
          Publish events, monitor participants, manage drafts, and keep every
          campus activity organized from one admin workspace.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-4">
          <button
            onClick={onCreate}
            className="flex items-center gap-2 rounded-2xl bg-primary px-7 py-3 text-lg font-bold text-white transition hover:scale-[1.02]"
          >
            <CalendarPlus size={20} />
            Create New Event
          </button>

          <div className="flex items-center gap-2 rounded-2xl border border-[#d8cdbf] bg-white/70 px-5 py-3 font-bold text-primaryText">
            <ClipboardList size={20} />
            Review Drafts
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-[#d8cdbf] bg-white/70 px-5 py-3 font-bold text-primaryText">
            <UsersRound size={20} />
            Track Participants
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateEventBanner;