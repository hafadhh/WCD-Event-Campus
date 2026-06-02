import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <AuthLayout>
      <div>
        <h1 className='text-5xl font-black text-dark'>
          Create Account
        </h1>

        <p className='mt-4 leading-relaxed text-softText'>
          Join your campus community today.
        </p>

        <div className='mt-10 space-y-6'>
          <Input
            label='Full Name'
            placeholder='Enter your name'
          />

          <Input
            label='Email'
            placeholder='Enter your email'
          />

          <Input
            label='Password'
            type='password'
            placeholder='Create password'
          />

          <Button className="btn-primary">
            Create Account
          </Button>
        </div>

        <p className='mt-8 text-center text-softText'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-bold bg-surface text-primaryText'
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Register