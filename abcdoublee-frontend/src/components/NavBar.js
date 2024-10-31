// Import necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling

// NavBar Component
function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-center">
        <input type="text" placeholder="Search..." className="nav-search" />
      </div>
      <div className="nav-right">
        <Link to="/login">User</Link>
      </div>
    </nav>
  );
}

export default NavBar;
