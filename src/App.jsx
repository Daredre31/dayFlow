import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Topbar from './components/layout/Topbar'
import Taskform from './ui/Taskform'
import Card1 from './ui/Card1'
import Alltask from './pages/Alltask'
import Layout from './pages/Dashboard'



const App = () => {
  return (
    <div className='h-screen'>
    
  <Routes>
    <Route path='/' element= {<Home />}>
        <Route path='dashboard' element={<Layout />} />
        <Route path='alltask' element={  <Alltask /> } />
         
    </Route>
 
  </Routes>
    
    </div> 
  )
}

export default App