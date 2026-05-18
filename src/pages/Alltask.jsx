import React, { useState } from 'react'
import Card1 from '../ui/Card1'


const filter = ["All" , 'Work' , "study" , "health" , "personal"]
const Alltask = () => {

  const [sfilter , setSfilter] = useState('')
  return (
    <div className='lg:h-[1000px] h-screen  w-full bg-bg relative '>
         <div className='flex gap-2 mt-4 p-2'>
           {filter.map(f => (
              <button
              onClick={()=> setSfilter(f)} className={`border border-border rounded px-2 text-secondary
              ${
                 sfilter === f ? "bg-accent text-text": 'bg-inherit'
              } 
              `}>
                  {f}
              </button>
           ))}
         </div>

         <div className='p-2 '>
           <div>
           <Card1 variant='grid' />
           </div>
          
         </div>
    </div>
  )
}

export default Alltask