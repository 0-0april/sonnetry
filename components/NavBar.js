import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        <li><Link to="/" aria-label="Go to Home page">Home</Link></li>
        <li><Link to="/short-stories" aria-label="Go to Short Stories page">Short Stories</Link></li>
        <li><Link to="/poetries" aria-label="Go to Poetries page">Poetries</Link></li>
        <li><Link to="/about" aria-label="Go to About page">About</Link></li>
        <li><Link to="/writer-login-page">Login as Writer</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
