
import React, { createContext, useCallback, useContext, useState } from 'react'

import { taskObject } from "../Mockdata/datas";
import { useLocalStorage } from '../CustomHook/UselocalStorage';

const taskContext = createContext()
export const Taskcontroller = ({children}) => {

    const [task , setTask] = useLocalStorage('dayFlowtask' , taskObject);
     const [checkedItems, setCheckedItems] = useState({});
    //  const [completdCheck , setCompletdCheck] = useState(0)

     const handleCheck = (taskId) => {
  setCheckedItems(prev => ({ ...prev, [taskId]: !prev[taskId] }));
};

const completdCheck = Object.values(checkedItems).filter(Boolean).length;


    const addTask = useCallback((taskData) =>{
      const  newtask ={
      id: crypto.randomUUID(),
      completed: false,
      completedAt: null,
      rating: 0,
      ...taskData,
        }
        setTask((prev) => [newtask , ...prev])
    } , [setTask]);

    const deleteTask = useCallback((id) => {
       setTask(prev => prev.filter((item) => item.id !==id))
       
    }, [setTask])
  return (
    <taskContext.Provider value={{ task, addTask , deleteTask,checkedItems 
    , setCheckedItems , completdCheck ,  handleCheck}}>
      {children} ,
    </taskContext.Provider>
  )
}

export const useTaskContext = () => useContext(taskContext)