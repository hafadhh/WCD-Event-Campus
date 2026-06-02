import { Pencil, Trash2 } from "lucide-react";
import { events } from '../../../data/events'
import Badge from '../../ui/Badge/Badge'

function EventManagementTable() {
  return (
    <section className="rounded-[32px] border border-borderSoft bg-white p-8 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-dark">Event Management</h2>

          <p className="mt-2 text-softText">
            Monitor and manage your published events.
          </p>
        </div>

        <button className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white">
          New Event
        </button>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-borderSoft">
        <table className="w-full border-collapse">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">
                Event
              </th>

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">
                Status
              </th>

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-softText">
                Participants
              </th>

              <th className="px-6 py-5 text-right text-sm font-bold uppercase tracking-wide text-softText">
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

                <td className="px-6 py-5">
                  <Badge
                    variant={
                      event.status === "Published" ? "success" : "warning"
                    }
                  >
                    {event.status}
                  </Badge>
                  {/* <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      event.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {event.status}
                  </span> */}
                </td>

                <td className="px-6 py-5 text-softText">
                  {event.participants}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">
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
