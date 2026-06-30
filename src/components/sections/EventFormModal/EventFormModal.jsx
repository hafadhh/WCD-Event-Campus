import { useState, useEffect } from 'react'
import Modal from '../../ui/Modal/Modal'
import Input from '../../ui/Input/Input'
import Textarea from '../../ui/Textarea/Textarea'
import Select from '../../ui/Select/Select'
import UploadBox from '../../ui/UploadBox/UploadBox'
import Button from '../../ui/Button/Button'

const CATEGORIES = ['Workshop', 'Music', 'Seminar', 'Competition', 'Career', 'Art', 'Technology', 'Networking']
const STATUSES = ['Published', 'Draft', 'Ongoing', 'Selesai']

const EMPTY_FORM = {
  title: '', category: 'Workshop', date: '', location: '',
  description: '', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
  status: 'Published',
}

function EventFormModal({ isOpen, onClose, onSave, editTarget }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editTarget) {
      setForm({
        title: editTarget.title,
        category: editTarget.category,
        date: editTarget.date,
        location: editTarget.location,
        description: editTarget.description || '',
        image: editTarget.image,
        status: editTarget.status || 'Published',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [editTarget, isOpen])

  function handleChange(field) {
    return (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  }

  function handleSubmit() {
    if (!form.title || !form.date || !form.location) {
      setError('Judul, tanggal, dan lokasi wajib diisi.')
      return
    }
    onSave(form)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editTarget ? 'Edit Event' : 'Create New Event'}>
      <div className="space-y-5">
        <Input
          label="Event Title"
          placeholder="Enter event title"
          value={form.title}
          onChange={handleChange('title')}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Category"
            options={CATEGORIES}
            value={form.category}
            onChange={handleChange('category')}
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={handleChange('date')}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange('location')}
          />
          <Select
            label="Status"
            options={STATUSES}
            value={form.status}
            onChange={handleChange('status')}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="Describe your event..."
          value={form.description}
          onChange={handleChange('description')}
        />

        <UploadBox />

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <Button onClick={handleSubmit}>
          {editTarget ? 'Save Changes' : 'Publish Event'}
        </Button>
      </div>
    </Modal>
  )
}

export default EventFormModal
