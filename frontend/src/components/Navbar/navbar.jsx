import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './navbar.css';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to control the visibility of the logout confirmation

  const handleLogout = () => {
    // Clear any authentication-related data (e.g., token)
    localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage

    // Redirect to the login page
    navigate('/login'); // Update this path according to your app's routing structure
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation); // Toggle confirmation visibility
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        {/* <img src={Logo} alt="logo" /> */}
        <h1 className='movie'>MoovieFlex</h1>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className='icons' />

        <div className="navbar-profile">
          
          <span className="account-text" onClick={toggleLogoutConfirmation}>Account</span>
          
          {showLogoutConfirmation && (
            <div className="dropdown">
              <p>Are you sure you want to log out?</p>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={toggleLogoutConfirmation}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
