import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import TaskPage from "./pages/TaskPage";
import TaskFromPage from "./pages/TaskFromPages";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import React from 'react';
import Navbar from "./components/navbar";

function app() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar/>
            <Routes>
              <Route path="/" element={<h1><HomePage /></h1>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute/>}>
                <Route path="/tasks" element={<h1><TaskPage /></h1>} />
                <Route path="/add-task" element={<h1><TaskFromPage /></h1>} />
                <Route path="/tasks/:id" element={<h1><TaskFromPage /></h1>} />
                <Route path="/profile" element={<h1><ProfilePage /></h1>} />
              </Route>
            </Routes>
          </main>  
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
export default app;
// "proxy": "http://localhost:4000/api", en json