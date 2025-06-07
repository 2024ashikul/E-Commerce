import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';
import NavBar from './components/NavBar';
import Profile from '../pages/Profile';
import PrivateRoute from './components/PrivateRouter';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/profile' element={<PrivateRoute> <Profile /> </PrivateRoute>}
        />
        
      </Routes>
    </BrowserRouter>
  );
}
