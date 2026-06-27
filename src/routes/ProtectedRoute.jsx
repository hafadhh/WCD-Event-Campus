import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldAlert } from 'lucide-react'

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Belum login → redirect ke login
  if (!user) {
    return <Navigate to='/login' replace />
  }

  // Login tapi role salah → tampilkan error page
  if (requiredRole && user.role !== requiredRole) {
    const correctPath = user.role === 'organizer' ? '/organizer' : '/dashboard'
    const label = user.role === 'organizer' ? 'Admin Panel' : 'Dashboard Mahasiswa'

    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center'>
        <div className='flex h-24 w-24 items-center justify-center rounded-[28px] bg-red-50'>
          <ShieldAlert size={48} className='text-red-500' />
        </div>

        <h1 className='mt-8 text-5xl font-black text-dark'>Akses Ditolak</h1>

        <p className='mt-4 max-w-md text-lg text-secondaryText'>
          Halaman ini tidak tersedia untuk role <strong>{user.role}</strong>. 
          Kamu tidak punya izin untuk mengakses halaman ini.
        </p>

        <div className='mt-10 flex gap-4'>
          <button
            onClick={() => navigate(-1)}
            className='rounded-2xl border border-borderSoft px-6 py-3 font-semibold text-dark transition hover:bg-background'
          >
            Kembali
          </button>
          <button
            onClick={() => navigate(correctPath, { replace: true })}
            className='rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]'
          >
            Ke {label}
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
