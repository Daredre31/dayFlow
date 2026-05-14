import React, { useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller';
import { taskObject } from '../Mockdata/datas';




const Card1 = () => {
  const [checked , setChecked] = useState(false)
  const {task} = useTaskContext()
  return (
    <div className='flex flex-wrap gap-2'>
        {task.map(items => (
          <div className='bg-surface2 w-[48%] h-24  px-2 rounded-md border border-border'>
              <div className='flex justify-between'>
                <span
                onClick={() => setChecked(!checked)} className='px-2  border border-border rounded-md cursor-pointer text-center text-green'>
                  {checked ? "✓" : '' }
                </span>
                <span
                 className='text-red bg-surface3 px-2 text-sm rounded-md'>{items.priority}</span>
              </div>

              <div>
                <span className='text-text text-sm'>{items.title}</span>
              </div>
              <div className='flex'>
                <span className='text-sm bg-accent rounded-md  px-2 text-text'>{items.category}</span>
              </div>
          </div>
        ))}
    </div>
  )
}

export default Card1