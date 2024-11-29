import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';

const Home = () => {
  const [videos, setVideos] = useState([]); // State to store video data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [heroVideo, setHeroVideo] = useState(null); // State for currently displayed hero video

  useEffect(() => {
    // Fetch videos from backend API
    fetch('http://localhost:3001/api/videos') // Ensure backend is running
      .then((response) => response.json())
      .then((data) => {
        console.log('Videos fetched:', data); // Debug to verify response
        setVideos(data);
        setHeroVideo(data[0]); // Set the first video as the default hero video
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleVideoClick = (video) => {
    setHeroVideo(video); // Update the hero video with the clicked video
  };

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
            onClick={() => handleVideoClick(video)} // Set the clicked video as the hero video
          >
            <video
              src={video.video_link}
              controls
              className="video-card"
              muted
              loop
            />
            <h3>{video.title}</h3>
            <p>{video.release_date}</p> {/* Display only the release date */}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
