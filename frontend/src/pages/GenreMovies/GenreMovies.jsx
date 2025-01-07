import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import Sidebar from '../../components/Sidebar/sidebar';
import './genre.css';

const API_KEY = '863a66b1b194d42146a0f662ff918286';
const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`;

function GenreMovies() {
  const { genreId } = useParams(); // Get the genre ID from the URL
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${MOVIES_BY_GENRE_URL}&with_genres=${genreId}`);
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [genreId]);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="genre-movies-page">
       <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Use Sidebar */}
      <button className="hamburger" onClick={toggleSidebar}>☰</button>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/path/to/placeholder.jpg'}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview || 'No description available.'}</p>
            <button>
              <a
                href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
    
  );
}

export default GenreMovies;
