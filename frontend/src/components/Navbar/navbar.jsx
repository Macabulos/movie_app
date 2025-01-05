import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
// import bell_icon from '../../assets/bell_icon.svg';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to control the visibility of the logout confirmation
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  const handleLogout = () => {
    // Clear any authentication-related data (e.g., token)
    localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage

    // Redirect to the login page
    navigate('/login'); // Update this path according to your app's routing structure
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation); // Toggle confirmation visibility
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const API_KEY = '863a66b1b194d42146a0f662ff918286';
      const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

      fetch(SEARCH_API_URL)
        .then((response) => response.json())
        .then((data) => {
          if (onSearch) {
            onSearch(data.results); // Pass the search results to the parent component
          }
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="movie">MoovieFlex</h1>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">🔍</button>
        </div>
        {/* <img src={bell_icon} alt="Notifications" className="icons" /> */}

        <div className="navbar-profile">
          <span className="account-text" onClick={toggleLogoutConfirmation}>Log Out</span>

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
