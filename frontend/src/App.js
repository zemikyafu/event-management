import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import React from 'react';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState({ messageType: '', message: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleAuth = (authState) => {
    setIsAuthenticated(authState);
  };

  const PrivateRoute = ({ element: Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
  };

  const handleMessage = (registrationMessage) => {
    setMessage(registrationMessage);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage handleAuth={handleAuth} message={message} />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route path="/registration" element={<RegistrationPage registrationMessage={handleMessage} />} />
          {/* <Route path="/events" element={<PrivateRoute element={EventsPage} />} /> */}
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

     
   
}

export default App;
