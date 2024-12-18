//route
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PropTypes from 'prop-types';
//component
import NavBar from './components/NavBar.jsx';  
//page
import LoginPage from './pages/LoginPage.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx'; 
import UserPage from './pages/UserPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PreferencePage from './pages/PreferencePage';
import BrowsePage from './pages/BrowsePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import PollutePage from './pages/PollutePage';
import './App.css';

function App() {
  const ProtectedRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');
    return token ? <Element /> : <Navigate to="/" replace />;
  };

  ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
  };

//Setting up route here. 
  return (
    <AuthProvider>
    <Router>
      <NavBar /> 
      <div className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} />} />
        <Route path="/preferences" element={<ProtectedRoute element={PreferencePage} />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pollute" element={<PollutePage />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;


