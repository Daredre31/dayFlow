import React, { useState } from 'react'
import myLogo from '../../assets/logo3.png'
import { useHeaderWord } from '../../context/Topbarhead'
import { Link } from 'react-router-dom'
import DayCard from '../../ui/DayCard'



  const SideBar = () => { 
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
            <DayCard width={'w-60'}/>
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