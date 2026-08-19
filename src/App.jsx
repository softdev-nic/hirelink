 import React from 'react'
 import Registration from './pages/reg/Registration'
 import Login from './pages/reg/Login'
 import ForgotPassword from './pages/reg/ForgotPassword'
 import ResetPassword from './pages/reg/ReserPassword'
 import Home from './pages/Home'
 import {Navigate,Route, Routes} from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
