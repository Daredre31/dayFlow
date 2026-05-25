import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../context/Api'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await api.post('/livelogin' , formData)
      

      localStorage.setItem("token", res.data.token)

      console.log(res.data)
  
      navigate('/home')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center px-4'>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8'
      >

        <h1 className='text-3xl font-bold text-center mb-8'>
          Login
        </h1>

        {/* Email */}
        <div className='flex flex-col mb-5'>

          <label className='mb-2 font-medium text-gray-700'>
            Email
          </label>

          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition'
          />

        </div>

        {/* Password */}
        <div className='flex flex-col mb-6'>

          <label className='mb-2 font-medium text-gray-700'>
            Password
          </label>

          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition'
          />

        </div>

        <button
          type='submit'
          className='w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition'
        >
          Login
        </button>

      </form>
    </div>
  )
}

export default Login