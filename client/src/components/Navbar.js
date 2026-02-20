import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isDark, setIsDark }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎬 Video2DZER
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/converter" className="nav-link">Converter</Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-link">Gallery</Link>
          </li>
        </ul>

        <button 
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;