import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { getStudents } from '../../data/users'

const FAKULTAS = [
  'Fakultas Ilmu Komputer',
  'Fakultas Ekonomi & Bisnis',
  'Fakultas Teknik',
  'Fakultas Hukum',
  'Fakultas Desain Kreatif',
]

// Aturan validasi per field
const RULES = {
  name: {
    required: true,
    pattern: /^[a-zA-Z\s.'-]+$/,
    msg: 'Nama hanya boleh berisi huruf.',
    minLen: 2,
    minLenMsg: 'Nama minimal 2 karakter.',
  },
  phone: {
    pattern: /^(\+62|08)[0-9]{8,12}$/,
    msg: 'Format: +62xxxxxxxxxx atau 08xxxxxxxxxx (8–12 digit).',
  },
  nim: {
    pattern: /^[0-9]{11}$/,
    msg: 'NIM harus berupa 11 digit angka.',
  },
  jurusan: {
    pattern: /^[a-zA-Z\s/&-]+$/,
    msg: 'Jurusan hanya boleh berisi huruf.',
  },
}

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Nama wajib diisi.'
  } else if (RULES.name.pattern && !RULES.name.pattern.test(form.name)) {
    errors.name = RULES.name.msg
  } else if (form.name.trim().length < 2) {
    errors.name = RULES.name.minLenMsg
  }

  if (form.phone && !RULES.phone.pattern.test(form.phone)) {
    errors.phone = RULES.phone.msg
  }

  if (form.nim && !RULES.nim.pattern.test(form.nim)) {
    errors.nim = RULES.nim.msg
  }

  if (form.jurusan && !RULES.jurusan.pattern.test(form.jurusan)) {
    errors.jurusan = RULES.jurusan.msg
  }

  return errors
}

function Settings() {
  const { user } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', phone: '', nim: '', fakultas: '', jurusan: '' })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    const students = getStudents()
    const me = students.find((s) => s.id === user.id)
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: me?.phone || '',
      nim: me?.nim || '',
      fakultas: me?.fakultas || '',
      jurusan: me?.jurusan || '',
    })
  }, [user])

  function handleChange(field) {
    return (e) => {
      let val = e.target.value
      // Blokir input angka di field nama
      if (field === 'name') val = val.replace(/[0-9]/g, '')
      // Blokir input huruf di field NIM
      if (field === 'nim') val = val.replace(/[^0-9]/g, '').slice(0, 11)
      // Format phone: hanya angka + + di depan
      if (field === 'phone') val = val.replace(/[^0-9+]/g, '')

      setForm((prev) => ({ ...prev, [field]: val }))
      // Clear error field ini
      setErrors((prev) => ({ ...prev, [field]: '' }))
      setSaved(false)
    }
  }

  function handleSave() {
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const students = getStudents()
    const idx = students.findIndex((s) => s.id === user.id)
    if (idx !== -1) {
      students[idx] = { ...students[idx], name: form.name, phone: form.phone, nim: form.nim, fakultas: form.fakultas, jurusan: form.jurusan }
      localStorage.setItem('wcd_students', JSON.stringify(students))
      const session = JSON.parse(sessionStorage.getItem('wcd_session') || '{}')
      session.name = form.name
      sessionStorage.setItem('wcd_session', JSON.stringify(session))
    }
    setSaved(true)
  }

  return (
    <DashboardLayout pageTitle='Pengaturan' pageSubtitle='Kelola data diri kamu.'>
      <div className='max-w-2xl'>
        {/* Avatar */}
        <div className='flex items-center gap-6 rounded-[28px] border border-borderSoft bg-surface p-6'>
          <div className='flex h-20 w-20 items-center justify-center rounded-[20px] bg-primarySoft text-4xl font-black text-primary'>
            {form.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <p className='text-xl font-black text-dark'>{form.name || '—'}</p>
            <p className='mt-1 text-sm text-secondaryText'>{form.email}</p>
            <p className='mt-1 text-xs text-secondaryText'>Foto profil tidak dapat diubah saat ini.</p>
          </div>
        </div>

        {/* Form */}
        <div className='mt-6 space-y-5 rounded-[28px] border border-borderSoft bg-surface p-8'>
          <h3 className='text-xl font-black text-dark'>Data Diri</h3>

          <Field
            label='Nama Lengkap'
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
            hint='Hanya huruf dan spasi.'
          />
          <Field label='Email' value={form.email} disabled />
          <Field
            label='Nomor Telepon'
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder='+6281234567890'
            error={errors.phone}
            hint='Contoh: +62812345678 atau 08123456789'
          />
          <Field
            label='NIM'
            value={form.nim}
            onChange={handleChange('nim')}
            placeholder='11 digit NIM'
            error={errors.nim}
            hint={`NIM wajib 11 digit angka. (${form.nim.length}/11)`}
          />

          <div>
            <label className='mb-2 block text-sm font-bold text-dark'>Fakultas</label>
            <select
              value={form.fakultas}
              onChange={handleChange('fakultas')}
              className='h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 text-sm outline-none focus:border-primary'
            >
              <option value=''>Pilih Fakultas</option>
              {FAKULTAS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <Field
            label='Jurusan / Program Studi'
            value={form.jurusan}
            onChange={handleChange('jurusan')}
            placeholder='Contoh: Teknik Informatika'
            error={errors.jurusan}
            hint='Hanya huruf, spasi, dan karakter /&-'
          />

          {saved && (
            <div className='rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700'>
              ✓ Perubahan berhasil disimpan.
            </div>
          )}

          <button
            onClick={handleSave}
            className='w-full rounded-2xl bg-primary py-4 font-bold text-white transition hover:scale-[1.01]'
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Field({ label, value, onChange, placeholder, disabled = false, error, hint }) {
  return (
    <div>
      <label className='mb-2 block text-sm font-bold text-dark'>{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-14 w-full rounded-2xl border px-5 text-sm outline-none transition focus:border-primary ${
          error
            ? 'border-red-400 bg-red-50'
            : disabled
            ? 'cursor-not-allowed border-borderSoft bg-background text-secondaryText'
            : 'border-borderSoft bg-white'
        }`}
      />
      {error ? (
        <p className='mt-1.5 text-xs font-medium text-red-500'>{error}</p>
      ) : hint ? (
        <p className='mt-1.5 text-xs text-secondaryText'>{hint}</p>
      ) : null}
    </div>
  )
}

export default Settings
