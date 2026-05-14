import React, { useEffect, useRef, useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller';
import { CATEGORIES } from "../Mockdata/datas";
import { PRIORITIES } from '../Mockdata/datas';
import Button from './Button';

const Taskform = ({closeForm}) => {

    const [title , setTitle ] = useState('');
    const [category , setCategory] = useState('');
    const [priority , setPriority] = useState('');
    const [status , setStatus] = useState('');
    const [duedate , setDuedate] = useState('');
    const [note , setNote] = useState('');
    const [dueTime , setDueTime] = useState('');
    const [count, setCount] = useState(0);
    const ref = useRef()
    const handleChange = (e) => {

      const value = e.target.value
      setTitle(value);

      setCount(value.trim().length)
    }

    useEffect(() => {
      ref.current.focus()
    } , [])

    const {addTask} = useTaskContext()
    
    const handleSubmkit = (e) => {
      e.preventDefault()
      const alldata= {title:title.trim() , category , priority, status , duedate , dueTime , note}

      addTask(alldata)
    }

    
  return (
    <div className=''>
        <div className='bg-surface2 border border-border md:w-[400px] w-[300px] max-h-max mx-auto rounded-xl'>
            <div className='flex justify-between p-2 border-b border-b-border'>
                <span className='text-text'>Add new task</span>
                <span onClick={closeForm} className='text-text'>x</span>
                
            </div>
            <div className='p-2'>
            <div className='flex justify-between w-[94%]'>
               <h5 className='text-secondary'>Task title</h5>
               <span className='text-secondary'>{count}/200</span>
            </div>
           
            <form onSubmit={(e) => e.preventDefault()}>
             <input type="text"  className='w-[94%] border border-accent
             focus:border-accent text-md rounded-md focus:outline-none indent-3'
             value={title}
             onChange={handleChange}
             ref={ref}/>

             <div>
              <label className='text-secondary'>category</label>
                <div className='flex gap-3'>
                 {
                  CATEGORIES.map((cat) => (
                    <button type='button'
                      onClick={()=> setCategory(cat)}
                    className={`flex items-center border
                      text-text   border-border rounded-xl text-sm px-2
                     ${
                      category === cat ? 'bg-accent': 'bg-inherit'
                     }
                    `}>
                      {cat}
                    </button>
                  ))
                 } </div> 
             </div>

             <div>
              <label className='text-secondary'>Priority</label>

              <div className='flex justify-between  '>
                 {
                  PRIORITIES.map((pr) =>(
                    <button type='button'
                    onClick={() => setPriority(pr)}
                    className={`border border-border w-[33%] h-14 rounded-md text-text
                    ${
                      priority === pr ?'bg-accent border-amber' : 'bg-inherit'
                      }
                    `}>
                      {pr}
                    </button>
                  ))
                 }
              </div>
             </div>

             <div className='flex justify-between mt-4'>
              <input type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
              className='w-[47%] bg-surface3 rounded-md py-1 px-2 text-text  focus:border border-accent focus:outline-none'/>
              <input
              value={dueTime}
              onChange={(e)=> setDueTime(e.target.value)} 
              type="time" className=' focus:border border-accent focus:outline-none w-[47%] bg-surface3 rounded-md py-1 px-2 text-text'/>
             </div>

             <div className='mt-2'>
              <label className='text-secondary'>Note <span className='text-tertiary'>(optional)</span></label>
                <div>
                  <textarea
                  rows={3}
                  ref={ref}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className='w-[100%] bg-surface3 rounded-lg
                  focus:border border-accent focus:outline-none
                  indent-3 text-text text-sm resize-none'></textarea>
                </div>
             </div>

             <div className='flex justify-between mt-3'>
              <Button bg='bg-text' width='w-[40%]' logo={'x'} text={'cancel'} onClick={closeForm}/>
              <Button bg='bg-accent' width='w-[55%]' logo={'+'} text={'addTask'} onClick={handleSubmkit}/>
             </div>
        </form>
        </div>
        
        </div>
        
    </div>
  )
}

export default Taskform