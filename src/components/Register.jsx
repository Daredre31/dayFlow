import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../context/Api'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

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
        const rAPI  = await api.post('/server/live',formData);
        console.log(rAPI);

        if(rAPI.status === 201) {
           navigate('/login')
        }
    } catch (error) {
       console.log(error) 
    }
  }

  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center px-4'>
       <div className='w-full max-w-md  border border-gray-200 rounded-2xl  bg-white shadow-xl p-8'>
      <form
        onSubmit={handleSubmit}
        className=''
      >

        <h1 className='text-3xl font-bold text-center mb-8'>
          Create Account
        </h1>

        {/* Username */}
        <div className='flex flex-col mb-5'>
          <label className='mb-2 font-medium text-gray-700'>
            Username
          </label>

          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter username'
            className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition'
          />
        </div>

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
            placeholder='Enter email'
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
            placeholder='Enter password'
            className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition'
        >
          Register
        </button>

      </form>
       <p>already have a account <Link to={'login'}><span>Login</span></Link> </p>
      </div>

      
    </div>
  )
}

export default Register