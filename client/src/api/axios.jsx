import axios from "axios"

const instance = axios.create({
    baseURL: 'mern-crud-auth-nine.vercel.app' ,
    // 'http://localhost:4000/api',
    withCredentials: true,
  });
export default instance