import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';  
import LoginPage from './pages/LoginPage.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx'; 
import './App.css';

//Setting up route here. 
function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        {/*
        <Route path="/" element={<HomePage />} />

        <Route path="/user" element={<UserPage />} />
        */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;