import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../context/Api'
import { useTaskContext } from '../context/Taskcontroller'

const Login = () => {
  const navigate = useNavigate()
  const {setUserName} = useTaskContext()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on type
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      const res = await api.post('/server/livelogin', formData)
      localStorage.setItem('token', res.data.token);
      console.log(res);
      navigate('/home')
      setUserName(res.data.data.user.name)
    } catch (error) {
      const message = error.response?.data?.message
      if (error.response?.status === 401) {
        setServerError('Incorrect email or password. Please try again.')
      } else if (error.response?.status === 404) {
        setServerError('No account found with this email.')
      } else {
        setServerError(message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8'
      >
        <h1 className='text-3xl font-bold text-center mb-8'>Login</h1>

        {/* Server Error Banner */}
        {serverError && (
          <div className='mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600'>
            {serverError}
          </div>
        )}

        {/* Email */}
        <div className='flex flex-col mb-5'>
          <label className='mb-2 font-medium text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className={`border rounded-lg px-4 py-3 outline-none transition
              ${errors.email
                ? 'border-red-400 focus:border-red-500 bg-red-50'
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
            placeholder='Enter your password'
            className={`border rounded-lg px-4 py-3 outline-none transition
              ${errors.password
                ? 'border-red-400 focus:border-red-500 bg-red-50'
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login