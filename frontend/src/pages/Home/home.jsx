import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [heroVideo, setHeroVideo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/videos')
      .then((response) => response.json())
      .then((data) => {
        console.log('Videos fetched:', data);
        setVideos(data);
        setHeroVideo(data[0]);
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleVideoClick = (video) => {
    setHeroVideo(video);
  };

  return (
    <div className="home">
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

      <div className="hero">
        {heroVideo ? (
          <>
            <video
              src={heroVideo.video_link}
              controls
              autoPlay
              muted
              loop
              className="hero-video"
            />
            <div className="hero-caption">
              <h1 className="title">{heroVideo.title || 'Untitled'}</h1>
              <p>{heroVideo.release_date || 'No release date available.'}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="more-cards">
        {videos.map((video, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleVideoClick(video)}
          >
            <video
              src={video.video_link}
              controls
              className="video-card"
              muted
              loop
            />
            <h3>{video.title}</h3>
            <p>{video.release_date}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
