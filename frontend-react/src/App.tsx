import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Welcome from './components/Welcome';
import Attendance from './components/Attendance';
import LeaveManagement from './components/LeaveManagement';
import Login from './components/Login';
import './App.css';

const App: React.FC = () => {
  const { userData, logout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={userData ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/welcome" />} />
      <Route path="/welcome" element={userData ? <Welcome userData={userData} onLogout={logout} /> : <Navigate to="/" />} />
      <Route path="/attendance" element={userData ? <Attendance userData={userData} onLogout={logout} /> : <Navigate to="/" />} />
      <Route path="/leave-management" element={userData ? <LeaveManagement userData={userData} onLogout={logout} /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App; 