import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar'; // Import Sidebar component

export default function Profile() {
  const [user, setUser] = useState(null); // State to store user data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  // Retrieve user data on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="profile-page">
     <Navbar />
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Use Sidebar */}
    <button className="hamburger" onClick={toggleSidebar}>☰</button>

      {/* Profile Content */}
      <div className="profile-content">
        {user ? (
          <div className="profile-details">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Country: {user.country}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
