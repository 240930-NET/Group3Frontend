import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 
//import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
//import CreateAccountPage from './pages/CreateAccountPage'; 
//import UserPage from './pages/UserPage'; 

//Setting up for route here. 
function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        {/*
        <Route path="/" element={<HomePage />} />
        
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/user" element={<UserPage />} />
        */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;