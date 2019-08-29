import React, { useState, useEffect } from 'react';
import { getDiscoverMovies, getConfiguration } from '../../services/movies';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getDiscoverMovies().then(dataResponse => {
      setMovies(dataResponse.results);
    });
    getConfiguration().then(response => {
      setConfig(response);
    })
  }, []);

  const searchMovies = (e) => {
    console.log(e.target.value);
  }
  console.log(movies);
  console.log(config);
  return (
    <div>
      <div className="search-container">
        <input 
          className="search-input" 
          onChange={searchMovies}
          placeholder="Search for a movie" />
        <button className="search-button">Search</button>
      </div>
      <div className="movie-grid">
        {movies && config &&
        movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} className="movie-image-link">
            <img className="image-in-grid" src={`${config.base_url}/${config.poster_sizes[3]}/${movie.poster_path}`} alt="" />
          </Link>
        ))}
        
      </div>
    </div>
  );
}

export default Home;
