import React, { useState, useEffect } from 'react';
import { getDiscoverMovies, getConfiguration, search } from '../../services/movies';
import Raitings from '../../components/raitings';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

let searchInput = '';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState({});
  const [starSelected, setStarSelected] = useState(0);
  const [searchMovies, setSearchMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isCancelled = false;
    const fetchDiscoverMovies = async () => {
      const dataResponse = await getDiscoverMovies();
      if (!isCancelled) {
        setMovies(dataResponse.results);
      }
    };
    const fetchConfiguration = async () => {
      const response = await getConfiguration();
      if (!isCancelled) {
        setConfig(response);
      }
    };
    searchInput = '';
    fetchDiscoverMovies();
    fetchConfiguration();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearchInput = (e) => {
    searchInput = e.target.value;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
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
    if (moviesToShow.length === 0) {
      return (<h2 className={styles['cr-1']}>0 movies found..</h2>);
    }
    return config &&
      moviesToShow.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className={styles['movie-image-link']}>
          <img 
            className={styles['image-in-grid']}
            src={`${config.base_url}/${config.poster_sizes[2]}/${movie.poster_path}`} 
            alt=""
          />
        </Link>
      ))
  }
  
  return (
    <div>
      <div className={styles['search-container']}>
        <input 
          className={styles['search-input']}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie" />
        <button 
          className={styles['search-button']}
          onClick={handleSearch}>
          Search
        </button>
      </div>
      <Raitings 
        starSelected={starSelected}
        handleStarSelected={handleStarSelected}
      />
      <div className={styles['movie-grid']}>
        {searchInput && searchMovies.length > 0 && renderMovies(searchMovies)}
        {!searchInput && movies.length > 0 && renderMovies(movies)}
        {searchInput && searchMovies.length === 0 && <h2 className={styles['cr-1']}>0 movies found..</h2>}
        
      </div>
    </div>
  );
}

export default Home;
