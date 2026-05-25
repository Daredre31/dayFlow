import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home/Home'
import Alltask from './pages/Alltask'
import Layout from './pages/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {

  return (

    <div className='h-screen'>

      <Routes>
         <Route path='/' element={<Register />} />

        <Route path='/login' element={<Login />} />

        <Route path='home' element={<Home />}>

          <Route path='dashboard' element={<Layout />} />

          <Route path='alltask' element={<Alltask />} />

        </Route>

      </Routes>

    </div>

  )
}

export default App