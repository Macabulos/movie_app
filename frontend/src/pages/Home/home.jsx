import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/Navbar/navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import Footer from '../../components/Footer/footer';

const Home = () => {
  const [videos, setVideos] = useState([]); // State to store video data

  // Fetch video data from the backend
  useEffect(() => {
    fetch('http://localhost:3001/api/videos') // URL of the backend API
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        {videos.length > 0 ? (
          <>
            {/* Display the first video as the main video */}
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
              <div className="hero-btns">
                <button className="btn">
                  <img src={play_icon} alt="" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="" />
                  More Info
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Display additional videos */}
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
