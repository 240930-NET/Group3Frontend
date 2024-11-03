import { React} from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar.jsx';  
import LoginPage from './pages/LoginPage.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx'; 
import UserPage from './pages/UserPage.jsx';
import './App.css';


function App() {
  const ProtectedRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');
    return token ? <Element /> : <Navigate to="/login" replace />;
  };

  ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
  };

//Setting up route here. 
  return (
    <AuthProvider>
    <Router>
      <NavBar /> 
      <Routes>
        {/*
        temporary putting route that has not implement yet here
        <Route path="/" element={<HomePage />} />
        */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;


