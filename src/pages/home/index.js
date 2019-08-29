import React, { useState, useEffect } from 'react';
import { getDiscoverMovies, getConfiguration } from '../../services/movies';

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
  return (
    <div>
      <h1>This is the home</h1>
      {config && <span>config set</span>}
      {movies && <span>movies set</span>}
    </div>
  );
}

export default Home;
