import axios from "./axios"
import Cookies from "js-cookie";

export const getTasksRequest = async() => {
  try {
    const token = Cookies.get("token"); 
    // console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
      withCredentials: true,
    };
    return await axios.get("/tasks", config); 
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getTaskRequest = async (id) => {
  try {
    const token = Cookies.get("token"); 
    // console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
      withCredentials: true,
    };
    return await axios.get(`/tasks/${id}`,config) 
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const createTaskRequest = async (task) => {
    try {
      const token = Cookies.get("token"); 
      // console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        },
        withCredentials: true,
      };
      return await axios.post("/tasks", task, config); 
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const updateTaskRequest = async (id,task) => {
  try {
    const token = Cookies.get("token"); 
    // console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
      withCredentials: true,
    };
    return await axios.put(`/tasks/${id}`,task,config )
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const deleteTaskRequest = async (id) => {
  try {
    const token = Cookies.get("token"); 
    // console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
      withCredentials: true,
    };
    return await axios.delete(`/tasks/${id}`, config) 
  } catch (error) {
    console.log(error);
    throw error;
  }
};

