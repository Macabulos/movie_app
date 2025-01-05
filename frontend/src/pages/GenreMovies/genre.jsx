import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './genre.css';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar'; // Import Sidebar component

const API_KEY = '863a66b1b194d42146a0f662ff918286';

function Genre() {
  const { genreId } = useParams(); // Get the genre ID from the URL
  const [movies, setMovies] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('Genre ID:', genreId); // Log genreId
    const MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    fetch(MOVIES_API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data); // Log API response
        setMovies(data.results || []); // Set movies to state
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [genreId]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="genre-movies-page">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className="content">
        {movies.length === 0 ? (
          <p>No movies found for this genre.</p>
        ) : (
          <div className="movies-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                ) : (
                  <p>No poster available</p>
                )}
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Genre;
