import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { findUserByEmail, saveStudent } from '../../data/users'

function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi.'
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid.'
    if (!form.password) newErrors.password = 'Password wajib diisi.'
    else if (form.password.length < 6) newErrors.password = 'Password minimal 6 karakter.'
    return newErrors
  }

  function handleSubmit() {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Cek duplikasi email
    const existing = findUserByEmail(form.email.trim())
    if (existing) {
      setErrors({ email: 'Email sudah terdaftar.' })
      return
    }

    setLoading(true)

    const newStudent = {
      id: `student-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: 'student',
    }

    saveStudent(newStudent)

    // Auto-login setelah register
    login(newStudent.email, newStudent.password)

    setLoading(false)
    navigate('/dashboard', { replace: true })
  }

  return (
    <AuthLayout>
      <div>
        <h1 className='text-5xl font-black text-dark'>Create Account</h1>

        <p className='mt-4 leading-relaxed text-softText'>
          Join your campus community today.
        </p>

        <div className='mt-10 space-y-6'>
          <Input
            label='Full Name'
            placeholder='Enter your name'
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
          />

          <Input
            label='Email'
            placeholder='Enter your email'
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
          />

          <Input
            label='Password'
            type='password'
            placeholder='Create password (min. 6 karakter)'
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>

        <p className='mt-8 text-center text-softText'>
          Already have an account?{' '}
          <Link to='/login' className='font-bold text-primary'>
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Register
