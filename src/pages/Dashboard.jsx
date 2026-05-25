import React, { useState } from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri"
import { RiHomeLine } from "react-icons/ri";
import { TiChartAreaOutline } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import { useTaskContext } from '../context/Taskcontroller';
import DayCard from '../ui/DayCard';
import Card1 from '../ui/Card1';
import TaskDonut from '../components/task/TaskDonut';





const filterBtn = ["All" , "Active" , "Done" , "high Priority"]

const Layout = () => {

  const {task , checkedItems, setCheckedItems , completdCheck , setCompletdCheck} = useTaskContext();

  
  const Taskcards = {
  logo : <BiMenuAltLeft />,
  // totalTask :  
  title: "Total task",
  // addedToday :

}

const completedCard = {
  logo: <IoCheckmarkOutline />,
  TotalCompleted : completdCheck,
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

const [dfilter , setDfilter] = useState();
  return (

    <div className=' h-[1000px]  w-full overflow-y-scroll-scroll bg-bg relative '>
        <div className='lg:hidden p-2'>
          <DayCard width={'w-full'}/>
        </div>
       <div className='lg:flex gap-3 text-white  mt-4 grid grid-cols-2 p-3 '>
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
            <span className='text-xl'>{completedCard.TotalCompleted}</span>
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

      

      <div className='mt-2 flex flex-col md:flex-row p-2 gap-4'>
        <div className='md:w-[70%] border border-border border-collapse max-h-max rounded-md bg-surface2 '>
           <div className='flex justify-between border border-border p-2'>
            <span className='text-text'>Today's tasks</span>
            <span  className='text-accent'>+ add task</span>
           </div>
           
           <div className='flex gap-3 mt-3 p-2'>
             {filterBtn.map(btn => (
              <button 
              onClick={()=>setDfilter(btn)} className={`border border-border px-2 text-sm rounded-xl text-text
                ${dfilter === btn ? 'bg-accent' : 'bg-inherit'}
              `}>
                {btn}
              </button>
             ))}
           </div>

            <Card1 state='list' />
        </div>
        <div>
          <TaskDonut />
        </div>
      </div>
    </div>
  )
}  

export default Layout