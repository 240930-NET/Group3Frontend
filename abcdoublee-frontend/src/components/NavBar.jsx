import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {

  
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-center">
        <input type="text" className="nav-search" placeholder="Search..." />
      </div>
      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/register">Create Account</Link>
      </div>
    </nav>
  );
}

export default NavBar;
