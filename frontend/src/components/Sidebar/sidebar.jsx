import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Create a CSS file for Sidebar-specific styles

const sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        {/* <li><Link to="/favorites">Favorites</Link></li> */}
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
};

export default sidebar;
