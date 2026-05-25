
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { taskObject } from "../Mockdata/datas";

import axios from 'axios';

const taskContext = createContext()
export const Taskcontroller = ({children}) => {

     
    const [task , setTask] = useState([]);
     const [checkedItems, setCheckedItems] = useState({});

     const token = localStorage.getItem('token');

     useEffect(() => {

   const astry = async () => {
     

       if(!token) {
         setTask([])
         return
       }
   try {

      const taskData = await axios.get(
         'http://localhost:8900/server3/alltask',
         {
            headers: {
               Authorization: `Bearer ${token}`
            }
         }
      );

      console.log(taskData.data);

      if(Array.isArray(taskData.data.data)){
         setTask(taskData.data.data)
      } else {
         setTask([])
      }

   } catch (error) {

      console.log(error.response?.data || error.message)

      setTask([])

   }

}
       astry()
      
     } , [token])
    

     const handleCheck = (taskId) => {
  setCheckedItems(prev => ({ ...prev, [taskId]: !prev[taskId] }));
};

const completdCheck = Object.values(checkedItems).filter(Boolean).length;


    const addTask = useCallback((taskData) =>{
      const  newtask ={
      completed: false,
      completedAt: null,
      rating: 0,
      ...taskData,
        }
        setTask((prev) => [newtask , ...prev])
    } , [token]);

    const deleteTask = useCallback( async (id) => {
       
        
      try {
        const del =await axios.delete(`http://localhost:8900/server3/deletetask/${id}`);
        setTask(prev => prev.filter((item) => item._id !==id))
      } catch (error) {
        
      }

    }, [])
  return (
    <taskContext.Provider value={{ task, addTask , deleteTask,checkedItems 
    , setCheckedItems , completdCheck ,  handleCheck}}>
      {children} ,
    </taskContext.Provider>
  )
}

export const useTaskContext = () => useContext(taskContext)