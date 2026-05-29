import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from './Api';

const taskContext = createContext()

export const Taskcontroller = ({ children }) => {

  const [task, setTask]               = useState([])
  const [checkedItems, setCheckedItems] = useState({})
  const [userName, setUserName]       = useState("")

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) { setTask([]); return }

      try {
        const res = await api.get('/server3/alltask')
        console.log('TASKS:', res.data)

        if (Array.isArray(res.data.data)) {
          setTask(res.data.data)
        } else {
          setTask([])
        }
      } catch (error) {
        console.log(error.response?.data || error.message)
        setTask([])
      }
    }

    fetchTasks()
  }, [token])

  const handleCheck = (taskId) => {
    setCheckedItems(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  const completdCheck = Object.values(checkedItems).filter(Boolean).length

  const addTask = useCallback((taskData) => {
    const newTask = {
      completed: false,
      completedAt: null,
      rating: 0,
      ...taskData,
    }
    setTask(prev => [newTask, ...prev])
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`/server3/deletetask/${id}`)
      setTask(prev => prev.filter(item => item._id !== id))
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    try {
      const res = await api.put(`/server3/updatetask/${id}`, updates)
      console.log('UPDATE RESPONSE:', res.data) // remove this after confirming it works
      setTask(prev => prev.map(t => t._id === id ? res.data.task : t))
    } catch (error) {
      console.log('UPDATE ERROR:', error)
    }
  }, [])

  return (
    <taskContext.Provider value={{
      task,
      addTask,
      deleteTask,
      updateTask,
      checkedItems,
      setCheckedItems,
      completdCheck,
      handleCheck,
      userName,
      setUserName
    }}>
      {children}
    </taskContext.Provider>
  )
}

export const useTaskContext = () => useContext(taskContext)