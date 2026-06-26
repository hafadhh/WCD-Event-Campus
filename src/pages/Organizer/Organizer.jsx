import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import OrganizerStats from "../../components/sections/OrganizerStats/OrganizerStats";
import EventManagementTable from "../../components/sections/EventManagementTable/EventManagementTable";
import CreateEventBanner from "../../components/sections/CreateEventBanner/CreateEventBanner";
import { useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import Input from "../../components/ui/Input/Input";
import Textarea from "../../components/ui/Textarea/Textarea";
import Select from "../../components/ui/Select/Select";
import UploadBox from "../../components/ui/UploadBox/UploadBox";
import Button from "../../components/ui/Button/Button";
import { events } from "../../data/events";

function Organizer() {
  const [openModal, setOpenModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false)
  return (
    <DashboardLayout hideTitle>
      <div className="min-w-0 space-y-0 overflow-hidden">
        <CreateEventBanner onCreate={() => setOpenModal(true)} />
          <section className="w-full max-w-full overflow-hidden rounded-[28px] bg-[#f7f1e8] py-5">
            <div className="mb-2 px-1">
              <h2 className="text-xl font-black text-primaryText">
                Registered Events
              </h2>
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
                      <h3 className="truncate font-bold text-primaryText">
                        {event.title}
                      </h3>

                      <p className="mt-2 truncate text-sm text-secondaryText">
                        {event.date} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        <OrganizerStats />
          <div className="pt-0">
            <EventManagementTable />
          </div>

        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create New Event"
        >
          <div className="space-y-5">
            <Input label="Event Title" placeholder="Enter event title" />

            <div className="grid gap-6 md:grid-cols-2">
              <Select
                label="Category"
                options={["Workshop", "Music", "Seminar", "Competition"]}
              />

              <Input label="Date" type="date" />
            </div>

            <Textarea
              label="Description"
              placeholder="Describe your event..."
            />

            <UploadBox />

            <Button>Publish Event</Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Organizer;
