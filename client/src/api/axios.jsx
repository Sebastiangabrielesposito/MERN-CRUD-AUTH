import axios from "axios"

const instance = axios.create({
    baseURL: 
    'https://mern-crud-auth-server-ten.vercel.app/api' ,
    // 'http://localhost:4000/api',
    withCredentials: true,
  });
export default instance