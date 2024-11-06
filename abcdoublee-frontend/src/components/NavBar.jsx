import { Link } from 'react-router-dom';
import './NavBar.css';
import UserDropdown from './UserDropdown.jsx';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import SearchComponent from './SearchComponent';


function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext); 

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
      </div>
      <div className="nav-center">
           <SearchComponent />
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <UserDropdown handleLogout={logout} />
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Account</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;