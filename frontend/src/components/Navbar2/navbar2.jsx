import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar2.css';

const Navbar2 = ({ onSearch }) => {
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       const API_KEY = '863a66b1b194d42146a0f662ff918286';
//       const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

//       fetch(SEARCH_API_URL)
//         .then((response) => response.json())
//         .then((data) => {
//           if (onSearch) {
//             onSearch(data.results);
//           }
//         })
//         .catch((error) => console.error('Error fetching search results:', error));
//     }
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="movie">MoovieFlex</h1>
      </div>

      <div className="navbar-right">
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="search-icon"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.241.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            </svg>
          </button>
        </div> */}

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

export default Navbar2;
