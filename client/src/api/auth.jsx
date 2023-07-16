import axios from "./axios"
import Cookies from 'js-cookie';


export const registerRequets =async user => axios.post(`/register`,user)

export const loginRequest = async user => axios.post(`/login`,user)

export const verifyTokenRequet = async (token) => {
    return axios.get('/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  };
  
  