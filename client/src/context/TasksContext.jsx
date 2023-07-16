import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";
import React from 'react';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);


  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      // console.log(res.data.tasks);
      setTasks(res.data.tasks)
      // console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }
  
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id ))
    } catch (error) {
      console.log(error);
    } 
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
    return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id,task) => {
    try {
      const res = await updateTaskRequest(id,task)
    console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TasksContext.Provider value={{ tasks,
        getTasks,
        createTask,
        deleteTask,
        getTask,
        updateTask
        }}>
      {children}
    </TasksContext.Provider>
  );
}
