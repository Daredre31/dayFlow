
import React, { createContext, useCallback, useContext } from 'react'

import { taskObject } from "../Mockdata/datas";
import { useLocalStorage } from '../CustomHook/UselocalStorage';

const taskContext = createContext()
export const Taskcontroller = ({children}) => {

    const [task , setTask] = useLocalStorage('dayFlowtask' , taskObject);

    const addTask = useCallback((taskData) =>{
      const  newtask ={
      id: crypto.randomUUID(),
      completed: false,
      completedAt: null,
      rating: 0,
      ...taskData,
        }
        setTask((prev) => [newtask , ...prev])
    } , [setTask])
  return (
    <taskContext.Provider value={{ task, addTask }}>
      {children}
    </taskContext.Provider>
  )
}

export const useTaskContext = () => useContext(taskContext)