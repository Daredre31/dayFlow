import React from 'react'
import SideBar from '../components/layout/SideBar'
import Topbar from '../components/layout/Topbar'
import MobileNav from '../components/layout/MobileNav'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (

    <div className='flex'>

      <div className='side-bar'>
        <SideBar />
      </div>

      <div className='flex flex-col w-screen'>

        <Topbar />

        <Outlet />

        <div className='border border-border w-full fixed bottom-0 h-24 bg-surface lg:hidden'>
          <MobileNav />
        </div>

      </div>

    </div>

  )
}

export default Home