import React, { useState, useEffect } from 'react';
import { getDiscoverMovies, getConfiguration, search } from '../../services/movies';
import Raitings from '../../components/raitings';
import { Link } from 'react-router-dom';
import './index.css';

let searchInput = '';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState({});
  const [starSelected, setStarSelected] = useState(0);
  const [searchMovies, setSearchMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDiscoverMovies().then(dataResponse => {
      setMovies(dataResponse.results);
    });
    getConfiguration().then(response => {
      setConfig(response);
    })
  }, []);

  const handleSearchInput = (e) => {
    searchInput = e.target.value;
  }

  const handleSearch = (e) => {
    if (searchInput) {
      search(searchInput).then(response => {
        setSearchMovies(response.results);
      });
    } else {
      setSearchMovies([]);
    }
  }

  const handleStarSelected = (numberSelected) => () => {
    if (numberSelected === starSelected) {
      setStarSelected(0);
      return;
    }
    setStarSelected(numberSelected);
  };

  const renderMovies = (moviesToRender) => {
    let moviesToShow = moviesToRender;
    if (starSelected) {
      moviesToShow = moviesToRender.filter(movie => (
        (movie.vote_average > (starSelected * 2) - 2) && (movie.vote_average <= (starSelected * 2))
      ))
    }
    
    return config &&
      moviesToShow.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-image-link">
          <img 
            className="image-in-grid"
            src={`${config.base_url}/${config.poster_sizes[2]}/${movie.poster_path}`} 
            alt=""
          />
        </Link>
      ))
  }
  
  return (
    <div>
      <div className="search-container">
        <input 
          className="search-input" 
          onChange={handleSearchInput}
          placeholder="Search for a movie" />
        <button 
          className="search-button"
          onClick={handleSearch}>
          Search
        </button>
      </div>
      <Raitings 
        starSelected={starSelected}
        handleStarSelected={handleStarSelected}
      />
      <div className="movie-grid">
        {searchInput && searchMovies.length > 0 && renderMovies(searchMovies)}
        {!searchInput && movies.length > 0 && renderMovies(movies)}
        {searchInput && searchMovies.length === 0 && <h2 className="cr-1">0 movies found..</h2>}
        
      </div>
    </div>
  );
}

export default Home;
