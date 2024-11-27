import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';

const Home = () => {
  const [videos, setVideos] = useState([]); // State to store video data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  useEffect(() => {
    // Fetch videos from backend API
    fetch('http://localhost:3001/api/videos') // Ensure backend is running
      .then((response) => response.json())
      .then((data) => {
        console.log('Videos fetched:', data); // Debug to verify response
        setVideos(data);
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="home">
      <Navbar />
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/favorites">Favorites</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>

      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className="hero">
        {videos.length > 0 ? (
          <>
            <video
              src={videos[0].video_link}
              controls
              autoPlay
              muted
              loop
              className="hero-video"
            />
            <div className="hero-caption">
              <h1 className="title">{videos[0].name}</h1>
              <p>{videos[0].description}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="more-cards">
        {videos.slice(1).map((video, index) => (
          <div className="card" key={index}>
            <video
              src={video.video_link}
              controls
              className="video-card"
              muted
              loop
            />
            <p>{video.name}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
