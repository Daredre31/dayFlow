import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../context/Api'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      newErrors.name = 'Username is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Username must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const res = await api.post('/server/live', formData)

      if (res.status === 201) {
        setSuccess(true)
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (error) {
      const message = error.response?.data?.message
      if (error.response?.status === 409) {
        setServerError('An account with this email already exists.')
      } else {
        setServerError(message || 'Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Success Screen ──────────────────────────────────────────
  if (success) {
    return (
      <div className='w-full min-h-screen bg-white flex items-center justify-center px-4'>
        <div className='w-full max-w-md border border-gray-200 rounded-2xl bg-white shadow-xl p-10 flex flex-col items-center text-center'>

          {/* Checkmark */}
          <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5'>
            <svg className='w-8 h-8 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          </div>

          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Account Created!</h2>
          <p className='text-gray-500 mb-1'>
            Welcome, <span className='font-medium text-gray-800'>{formData.name}</span> 👋
          </p>
          <p className='text-gray-400 text-sm mb-8'>Redirecting you to login in a moment...</p>

          {/* Progress bar */}
          <div className='w-full bg-gray-100 rounded-full h-1.5 overflow-hidden'>
            <div className='h-full bg-black rounded-full animate-[shrink_3s_linear_forwards]' />
          </div>

          <button
            onClick={() => navigate('/login')}
            className='mt-6 w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition'
          >
            Go to Login now
          </button>

        </div>
      </div>
    )
  }

  // ── Register Form ───────────────────────────────────────────
  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center px-4'>
      <div className='w-full max-w-md border border-gray-200 rounded-2xl bg-white shadow-xl p-8'>

        <h1 className='text-3xl font-bold text-center mb-8'>Create Account</h1>

        {serverError && (
          <div className='mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600'>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className='flex flex-col mb-5'>
            <label className='mb-2 font-medium text-gray-700'>Username</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter username'
              className={`border rounded-lg px-4 py-3 outline-none transition
                ${errors.name
                  ? 'border-red-400 bg-red-50 focus:border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
            />
            {errors.name && (
              <p className='mt-1.5 text-sm text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col mb-5'>
            <label className='mb-2 font-medium text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email'
              className={`border rounded-lg px-4 py-3 outline-none transition
                ${errors.email
                  ? 'border-red-400 bg-red-50 focus:border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
            />
            {errors.email && (
              <p className='mt-1.5 text-sm text-red-500'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className='flex flex-col mb-6'>
            <label className='mb-2 font-medium text-gray-700'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter password'
              className={`border rounded-lg px-4 py-3 outline-none transition
                ${errors.password
                  ? 'border-red-400 bg-red-50 focus:border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
            />
            {errors.password && (
              <p className='mt-1.5 text-sm text-red-500'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

        </form>

        <p className='mt-5 text-sm text-center text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-black underline'>
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register