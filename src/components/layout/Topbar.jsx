import React, { useState } from 'react'
import { useHeaderWord } from '../../context/Topbarhead'
import Button from '../../ui/Button'
import { Search } from 'lucide-react'
import Taskform from '../../ui/Taskform'


const dateRR = new Date()
 const dateAA = {
    weekday: dateRR.toLocaleString('default', { weekday: 'short' }),
    day: dateRR.getDate(),
     month: dateRR.toLocaleString('default', { month: 'long' }),
     year: dateRR.getFullYear() 
 }

const Topbar = () => {

  const [opentask , setOpenTask] = useState(false);
  const {word} = useHeaderWord()
  return (
    <div>
    <div className='flex justify-between bg-surface border border-border h-15'>
      <div className='px-8 mt-4 py-2 '>
         <h3 className='text-text font-bold text-[18px]'>{word}</h3>
         <p className='text-secondary text-sm'>{dateAA.weekday} {dateAA.day} {dateAA.month} {dateAA.year}</p>
      </div>
      <div className='flex items-center gap-8 px-4 lg:w-[60%] justify-end'>

            <div className='h-10 border border-border rounded-md hidden md:flex
             bg-surface2 flex items-center w-140 justify-center gap-2 px-2'>   
               <Search className='text-[15px]  text-secondary' />
            <input type="text" placeholder='search tasks' className='h-[100%] bg-surface2 flex justify-start items-center outline-none text-white' />
    </div>
          
        <Button text={" + add task "} bg={'bg-accent'} textcolor={'text-text'} onClick={ ()=> setOpenTask(true)}/>
      </div>

      
    </div>
    
  {  opentask && 
    <div className='fixed inset-0 top-10 z-50'>
           <Taskform closeForm={() => setOpenTask(false)}/>
      </div>}
    </div>
  )
}

export default Topbar