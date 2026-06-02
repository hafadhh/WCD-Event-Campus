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

function Organizer() {
  const [openModal, setOpenModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false)
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <CreateEventBanner onCreate={() => setOpenModal(true)} />

        <OrganizerStats />

        <EventManagementTable />
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create New Event"
        >
          <div className="space-y-6">
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
