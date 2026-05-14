import React from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri"
import { RiHomeLine } from "react-icons/ri";
import { TiChartAreaOutline } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";



const Taskcards = {
  logo : <BiMenuAltLeft />,
  totalTask : 24 ,
  title: "Total task",
  addedToday : `+3 today`

}

const completedCard = {
  logo: <IoCheckmarkOutline />,
  TotalCpmpleted : 15,
  title: "completed",
  rate : "62%"
}
const progressCard = {
  logo: <IoMdTime />,
  inProgress : 6,
  title: "completed",
  due : "due totay"
}
const overDueCard = {
  logo: <RiErrorWarningLine />,
  TotalOverDue : 3,
  title: "overdue",
  warning : "Action needed"
}

// const taskAddcat = ['work' , 'study' , 'health' , 'personal'] ;
// const taskAdd


const Layout = () => {
  return (

     
    <div className=' lg:h-[1000px] h-screen  w-full bg-bg relative '>
       <div className='lg:flex gap-3 text-white  mt-8 grid grid-cols-2 p-3 '>
        <div className='border border-border rounded-md lg:w-64 bg-surface   '>
          <div className='flex justify-between p-2 text-sm'>
            <span className='bg-surface3 w-8 h-8 p-1 text-2xl text-accent border border-border rounded-md'>{Taskcards.logo}</span>
            <span className='bg-surface2 text-green   max-w-fit h-6 p-1 text-xs font-semibold  rounded-md'>{Taskcards.addedToday}</span>
          </div>
          <div className='flex flex-col text-sm gap-1 p-2'>
            <span className='text-xl'>{Taskcards.totalTask}</span>
            <span className='text-xs text-secondary'>{Taskcards.title}</span>
          </div>
        </div>
        <div className='border border-border rounded-md lg:w-64 bg-surface  '>
          <div className='flex justify-between p-2 text-sm'>
            <span className='bg-surface3 w-8 h-8 p-1 text-2xl text-green border border-border rounded-md'>{completedCard.logo}</span>
            <span className='bg-surface2 text-green   max-w-fit h-6 p-1 text-xs font-semibold  rounded-md'>{completedCard.rate}</span>
          </div>
          <div className='flex flex-col text-sm gap-1 p-2'>
            <span className='text-xl'>{completedCard.TotalCpmpleted}</span>
            <span className='text-xs text-secondary'>{completedCard.title}</span>
          </div>
        </div>
        <div className='border border-border rounded-md lg:w-64 bg-surface  '>
          <div className='flex justify-between p-2 text-sm'>
            <span className='bg-surface3 w-8 h-8 p-1 text-2xl text-amber border border-border rounded-md'>{progressCard.logo}</span>
            <span className='bg-surface2 text-amber   max-w-fit h-6 p-1 text-xs font-semibold  rounded-md'>{progressCard.due}</span>
          </div>
          <div className='flex flex-col text-sm gap-1 p-2'>
            <span className='text-xl'>{progressCard.inProgress}</span>
            <span className='text-xs text-secondary'>{progressCard.title}</span>
          </div>
        </div>
        <div className='border border-border rounded-md lg:w-64 bg-surface  '>
          <div className='flex justify-between p-2 text-sm'>
            <span className='bg-surface3 w-8 h-8 p-1 text-2xl text-red border border-border rounded-md'>{overDueCard.logo}</span>
            <span className='bg-surface2 text-red   max-w-fit h-6 p-1 text-xs font-semibold  rounded-md'>{overDueCard.warning}</span>
          </div>
          <div className='flex flex-col text-sm gap-1 p-2'>
            <span className='text-xl'>{overDueCard.TotalOverDue}</span>
            <span className='text-xs text-secondary'>{overDueCard.title}</span>
          </div>
        </div>
        
       </div>

      
    </div>
  )
}

export default Layout