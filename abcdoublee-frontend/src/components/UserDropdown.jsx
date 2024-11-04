// src/components/UserDropdown.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDropdown.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function UserDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <div className="user-dropdown-container">
      <div className="user-icon" onClick={() => setShowMenu((prev) => !prev)}>
        <span>👤</span> 
      </div>
      {showMenu && (
        <div className="user-dropdown-menu">
          <ul>
            <li onClick={() => navigate('/user')}>User Profile</li>
            <li onClick={() => navigate('/preferences')}>User Preference</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
