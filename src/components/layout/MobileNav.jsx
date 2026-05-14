import React from 'react'
import { RiHomeLine } from "react-icons/ri";
import { BiMenuAltLeft } from "react-icons/bi";
import { TiChartAreaOutline } from "react-icons/ti";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from 'react-router-dom';

const MobileNav = () => {
  return (
    
          <nav className='flex justify-between text-secondary p-4 '>
           <Link to={'dashboard'}> <span className='flex flex-col justify-center items-center'><RiHomeLine className='text-[30px]' />Home</span> </Link>  
          <Link to={'alltask'}>  <span className='flex flex-col justify-center items-center'><BiMenuAltLeft className='text-[30px]' />Task</span>   </Link>
            <span className='flex flex-col justify-center items-center'><TiChartAreaOutline className='text-[30px]' />Stats</span>   
            <span className='flex flex-col justify-center items-center'> <RiErrorWarningLine className='text-[30px]' />Check-in</span>   
            <span className='flex flex-col justify-center items-center'><MdMoreHoriz className='text-[30px]' />More</span>   
          </nav>
       
  )
}

export default MobileNav