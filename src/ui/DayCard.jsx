import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller'


const dateRR = new Date()
 const dateAA = {
    weekday: dateRR.toLocaleString('default', { weekday: 'short' }),
    day: dateRR.getDate(),
     month: dateRR.toLocaleString('default', { month: 'long' }),
     year: dateRR.getFullYear() 
 }


const DayCard = ({width}) => {
   const {task , completdCheck} = useTaskContext()
     
     const [progress , setProgress] = useState(0)

     useEffect(()=> {
        if(task.length === 0){
            setProgress(0)
        } else {
             const ctPercent = (completdCheck * 100)/task.length
             setProgress(ctPercent)
        }
     } ,[task , completdCheck])
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <span className='px-2 text-xs text-tertiary  mt-3'>TODAY</span>
            <div className={`border-border h-[100px] ${width} rounded-lg mx-auto bg-accent flex flex-col gap-1 text-text `}>
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
                    <span className='text-xs'>{Math.round(progress)}%</span>
                </div>
                <div className='w-[95%] h-2 bg-gray-400 mx-auto rounded-full mt-1'>
                    <div className=' h-full bg-white rounded-full' style={{ width: `${progress}%` }}></div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default DayCard