import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { getStudents, saveStudent } from '../../data/users'

const FAKULTAS = [
  'Fakultas Ilmu Komputer',
  'Fakultas Ekonomi & Bisnis',
  'Fakultas Teknik',
  'Fakultas Hukum',
  'Fakultas Desain Kreatif',
]

function Settings() {
  const { user, login } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    nim: '',
    fakultas: '',
    jurusan: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    // Load existing data from localStorage
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
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setSaved(false)
    }
  }

  function handleSave() {
    const students = getStudents()
    const idx = students.findIndex((s) => s.id === user.id)
    if (idx !== -1) {
      students[idx] = {
        ...students[idx],
        name: form.name,
        phone: form.phone,
        nim: form.nim,
        fakultas: form.fakultas,
        jurusan: form.jurusan,
      }
      localStorage.setItem('wcd_students', JSON.stringify(students))
      // Update session
      const session = JSON.parse(sessionStorage.getItem('wcd_session') || '{}')
      session.name = form.name
      sessionStorage.setItem('wcd_session', JSON.stringify(session))
    }
    setSaved(true)
  }

  const initials = form.name?.charAt(0).toUpperCase() || '?'

  return (
    <DashboardLayout pageTitle="Pengaturan" pageSubtitle="Kelola data diri kamu.">
      <div className="max-w-2xl">
        {/* Avatar section */}
        <div className="flex items-center gap-6 rounded-[28px] border border-borderSoft bg-surface p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-primarySoft text-4xl font-black text-primary">
            {initials}
          </div>
          <div>
            <p className="text-xl font-black text-dark">{form.name || '—'}</p>
            <p className="mt-1 text-sm text-secondaryText">{form.email}</p>
            <p className="mt-1 text-xs text-secondaryText">
              Foto profil tidak dapat diubah saat ini.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-5 rounded-[28px] border border-borderSoft bg-surface p-8">
          <h3 className="text-xl font-black text-dark">Data Diri</h3>

          <Field label="Nama Lengkap" value={form.name} onChange={handleChange('name')} />
          <Field label="Email" value={form.email} disabled />
          <Field label="Nomor Telepon" value={form.phone} onChange={handleChange('phone')} placeholder="+62..." />
          <Field label="NIM" value={form.nim} onChange={handleChange('nim')} placeholder="Nomor Induk Mahasiswa" />

          <div>
            <label className="mb-2 block text-sm font-bold text-dark">Fakultas</label>
            <select
              value={form.fakultas}
              onChange={handleChange('fakultas')}
              className="h-14 w-full rounded-2xl border border-borderSoft bg-white px-5 text-sm outline-none focus:border-primary"
            >
              <option value="">Pilih Fakultas</option>
              {FAKULTAS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <Field label="Jurusan / Program Studi" value={form.jurusan} onChange={handleChange('jurusan')} placeholder="Contoh: Teknik Informatika" />

          {saved && (
            <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              ✓ Perubahan berhasil disimpan.
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-primary py-4 font-bold text-white transition hover:scale-[1.01]"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Field({ label, value, onChange, placeholder, disabled = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-dark">{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-14 w-full rounded-2xl border border-borderSoft px-5 text-sm outline-none transition focus:border-primary ${
          disabled ? 'cursor-not-allowed bg-background text-secondaryText' : 'bg-white'
        }`}
      />
    </div>
  )
}

export default Settings
