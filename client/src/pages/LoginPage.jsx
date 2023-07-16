import React from "react";
import { useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// import { zodResolver } from "@hookform/resolvers/zod";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin,errors:signinErros,isAuthenticated  } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(()=>{
    if (isAuthenticated) navigate("/tasks")
  },[isAuthenticated])

  // const onSubmit = (data) => signin(data);



  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {signinErros.map((error, i) => (
        <div className=" bg-red-500 p-2 text-white text-center m-2" key={i}>{error}</div>
      ))}
        <h1 className="text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}
          <button type="submit"
          className="bg-sky-500 text-white px-2 py-1 rounded-md my-2"
          >Login</button>
        </form>
        <p className="flex gap-2 justify-between">
            Don't have an account? <Link to="/register" className="text-sky-500" >Sign up</Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
