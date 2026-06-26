import { Pencil, Plus, Trash2 } from "lucide-react";
import { events } from '../../../data/events'
import Badge from '../../ui/Badge/Badge'

function EventManagementTable() {
  return (
    <section className="mt-12 rounded-[32px] border border-borderSoft bg-white p-8 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-dark">Event Management</h2>

          <p className="mt-2 text-softText">
            Monitor and manage your published events.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-primary px-3 py-3 font-semibold text-white">
          <Plus size={18} />
          New Event
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-borderSoft">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-[#eee8dd]">
            <tr>
              <th className="w-[25%] px-6 py-5 text-center text-sm font-black uppercase tracking-[0.05em] text-dark">
                Event
              </th>

              <th className="w-[18%] px-6 py-5 text-center text-sm font-black uppercase tracking-[0.05em] text-dark">
                Status
              </th>

              <th className="w-[18%] px-6 py-5 text-center text-sm font-black uppercase tracking-[0.05em] text-dark">
                Participants
              </th>

              <th className="w-[22%] px-6 py-5 text-center text-sm font-black uppercase tracking-[0.05em] text-dark">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-borderSoft">
                <td className="px-6 py-5 font-semibold text-dark">
                  {event.title}
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="flex justify-center">
                    <Badge
                      variant={event.status === "Published" ? "success" : "warning"}
                    >
                      {event.status}
                    </Badge>
                  </div>
                </td>

                <td className="px-6 py-5 text-center text-softText">
                  {event.participants}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-borderSoft">
                      <Pencil size={18} />
                    </button>

                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

{
  /* <Modal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  title='Create New Event'
>
  <div className='space-y-6'>
    <Input
      label='Event Title'
      placeholder='Enter event title'
    />

    <div className='grid gap-6 md:grid-cols-2'>
      <Select
        label='Category'
        options={[
          'Workshop',
          'Music',
          'Seminar',
          'Competition'
        ]}
      />

      <Input
        label='Date'
        type='date'
      />
    </div>

    <Textarea
      label='Description'
      placeholder='Describe your event...'
    />

    <UploadBox />

    <Button>
      Publish Event
    </Button>
  </div>
</Modal> */
}

export default EventManagementTable;
