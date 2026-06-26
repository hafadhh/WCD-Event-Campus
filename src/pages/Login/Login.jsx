import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setError('') // clear error on change
    }
  }

  function handleSubmit() {
    const { email, password } = form

    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)
    const result = login(email.trim(), password)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    // Redirect berdasarkan role
    if (result.role === 'organizer') {
      navigate('/organizer', { replace: true })
    } else {
      navigate('/dashboard', { replace: true })
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <AuthLayout>
      <div>
        <h1 className='text-5xl font-black text-dark'>Welcome Back</h1>

        <p className='mt-4 leading-relaxed text-softText'>
          Sign in to continue exploring campus events.
        </p>

        <div className='mt-10 space-y-6'>
          <Input
            label='Email'
            placeholder='Enter your email'
            value={form.email}
            onChange={handleChange('email')}
            onKeyDown={handleKeyDown}
          />

          <Input
            label='Password'
            type='password'
            placeholder='Enter your password'
            value={form.password}
            onChange={handleChange('password')}
            onKeyDown={handleKeyDown}
          />

          {error && (
            <p className='rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600'>
              {error}
            </p>
          )}

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        <p className='mt-8 text-center text-softText'>
          Don't have an account?{' '}
          <Link to='/register' className='font-bold text-primary'>
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login
