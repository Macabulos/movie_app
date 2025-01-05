import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './category.css';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar'; // Import Sidebar component

const API_KEY = '863a66b1b194d42146a0f662ff918286';
const GENRES_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

function Category() {
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch genres dynamically from TMDB API
    fetch(GENRES_API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.genres) {
          setCategories(data.genres); // Set the genres to the state
        }
      })
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="category-page">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Use Sidebar */}
      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className="content">
        {categories.length === 0 ? (
          <p>Loading categories...</p>
        ) : (
          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <h3>{category.name}</h3>
                <button className="view-button">
                  <Link to={`/category/${category.id}`}>View Movies</Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
