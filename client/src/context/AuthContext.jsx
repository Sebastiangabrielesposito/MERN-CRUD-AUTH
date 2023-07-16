import { createContext, useState, useContext, useEffect } from "react";
import { registerRequets, loginRequest, verifyTokenRequet } from "../api/auth";
import Cookies from "js-cookie";
import React from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequets(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.token)
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.token)
      console.log(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      // console.log(cookies.token);
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null)
        console.log(false);
        
      }
        try {
          const res = await verifyTokenRequet(cookies.token);
          // console.log(res);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false)
            return
          }
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false)
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false)
        }
    }
    checkLogin();
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        loading,
        isAuthenticated,
        errors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;