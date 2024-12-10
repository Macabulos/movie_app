import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './favorites.css';
import Navbar from '../../components/Navbar/navbar';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate(); // React Router's hook for programmatic navigation

  useEffect(() => {
    // Retrieve favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="favorites-page">
      <Navbar />
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className="content">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((video, index) => (
              <div key={index} className="favorite-card">
                <video src={video.video_link} controls className="video-card" />
                <h3>{video.title}</h3>
                <p>{video.release_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
