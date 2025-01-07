import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import Sidebar from '../../components/Sidebar/sidebar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const API_KEY = '863a66b1b194d42146a0f662ff918286';
 

  useEffect(() => {
    const TMDB_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(TMDB_API_URL);
  }, [API_KEY]);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      if (data.results.length > 0) {
        setHeroMovie(data.results[0]);
        fetchTrailer(data.results[0].id);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const TRAILER_API_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(TRAILER_API_URL);
      const data = await response.json();
      const youtubeTrailer = data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      if (youtubeTrailer) {
        setTrailer(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleMovieClick = (movie) => {
    setHeroMovie(movie);
    fetchTrailer(movie.id);
  };

  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setMovies(results);
      setHeroMovie(results[0]);
      fetchTrailer(results[0].id);
    } else {
      setMovies([]);
      setHeroMovie(null);
      setTrailer(null);
    }
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearchResults} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="hero">
        {heroMovie && trailer ? (
          <>
            <iframe
              src={trailer}
              title={heroMovie.title}
              className="hero-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="hero-caption">
              <h1 className="title">{heroMovie.title || 'Untitled'}</h1>
              <p>{heroMovie.release_date || 'No release date available.'}</p>
            </div>
          </>
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      <div className="more-cards">
        {movies.map((movie, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
