import React, { useState } from 'react'
import myLogo from '../../assets/logo3.png'
import { useHeaderWord } from '../../context/Topbarhead'
import { Link } from 'react-router-dom'

const dateRR = new Date()
 const dateAA = {
    weekday: dateRR.toLocaleString('default', { weekday: 'short' }),
    day: dateRR.getDate(),
     month: dateRR.toLocaleString('default', { month: 'long' }),
     year: dateRR.getFullYear() 
 }
const SideBar = () => { 
     const [progress , setProgress] = useState(40);
     const {word} = useHeaderWord()
     const {setWord} = useHeaderWord()
  return (
    <main className='lg:h-[100%]  hidden lg:flex flex-col justify-between border border-border bg-surface '>
    <div className=' text-white flex flex-col gap-1 px-2 '>

        <div className=' flex gap-1 items-center border border-border mt-1 '>
            <div>
            <img src={myLogo} alt="Logo" className='w-[70px] h-[60px]'/>
         </div>
         <div className='flex flex-col '> 
            <span>DayFlow</span>
            <span className='text-xs text-text'>Task manager</span>
         </div>
        </div>
         
        <div>
            </div>
        <div className='flex flex-col gap-2'>
            <span className='px-2 text-xs text-tertiary  mt-3'>TODAY</span>
            <div className='border-border h-[100px] w-60 rounded-lg mx-auto bg-accent flex flex-col gap-1 '>
                <div className=' flex gap-2 items-center px-2 '> 
                    <span className='text-xl '>{dateAA.weekday}</span>
                    <span className='text-xl'>{dateAA.day}</span>
                    
                </div>
                <div className='flex items-center px-2 gap-2 '>
                    <span className='text-sm'>{dateAA.month}</span>
                    <span className='text-sm'>{dateAA.year}</span>
                </div>
                 <div className='flex justify-between px-2'>
                    <span className='text-xs'>daily progress</span>
                    <span className='text-xs'>{progress}%</span>
                </div>
                <div className='w-[95%] h-2 bg-gray-400 mx-auto rounded-full mt-1'>
                    <div className=' h-full bg-white rounded-full' style={{ width: `${progress}%` }}></div>
                
                </div>
            </div>
        </div>

         <span className='px-2 text-xs text-tertiary  mt-6'>MENU</span>
        <div className='flex flex-col gap-3 text-[14px] text-secondary px-2 mt-2'>
          <Link to={'dashboard'}> <span className=''  
           onClick={() => setWord("Dashboard")}>Dashboard</span> </Link>
          <Link to={'alltask'}><span onClick={() => setWord("All Tasks")}>All task</span></Link> 
            <span onClick={() => setWord("Today")}>Today</span>
           <span onClick={() => setWord("This Week")}>This week</span>
           <span onClick={() => setWord("Overdue")}>overdue</span>
           <span onClick={() => setWord("Completed")}>completed</span>
        </div>

        <span className='px-2 text-xs text-tertiary  mt-6'>CATEGORIES</span>
        <div className='flex flex-col gap-3 text-[14px] text-secondary px-2 text-xs mt-2'>
            <span>work</span>
            <span>personal</span>
            <span>health</span>
            <span>study</span>
        </div>
    </div>

    <div className='text-white p-4 border-t border-border'>
  gsjcsbdhsdfbhdnsjkd
</div>
    
    </main>
  )
}

export default SideBar