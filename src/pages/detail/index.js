import React, { useState, useEffect } from 'react';
import { getMovie, getConfiguration } from '../../services/movies';
import { Link } from 'react-router-dom';
import './index.css';

const MovieDetail = (props) => {
  const [movie, setMovie] = useState({});
  const [config, setConfig] = useState({});

  useEffect(() => {
    let isCancelled = false;
    window.scrollTo(0, 0);
    const fetchMovie = async (movieId) => {
      const dataResponse = await getMovie(movieId);
      if (!isCancelled) {
        setMovie(dataResponse);
      }
    };
    const fetchConfiguration = async () => {
      const response = await getConfiguration();
      if (!isCancelled) {
        setConfig(response);
      }
    };
    if (props && props.match && props.match.params && props.match.params.id) {
      fetchMovie(props.match.params.id);
      fetchConfiguration();
    }
    return () => {
      isCancelled = true;
    };
  }, [props]);

  if (movie && config && config.poster_sizes) {
    const { 
      title,
      poster_path,
      backdrop_path,
      genres,
      homepage,
      overview,
      release_date,
      revenue,
    } = movie;
    return (
      <div>
        <div className="home-button-container">
          <Link 
            className="home-button"
            to="/">
              {`< HOME`}
            </Link>
        </div>
        <h1>{title}</h1>
        <div className="images-container">
          <img 
            className="image-detail"
            src={`${config.base_url}/${config.poster_sizes[3]}/${poster_path}`} 
            alt=""
          />
        </div>
        <div className="description-container">
          {genres &&
          <div className="description">
            <span><strong>Genres: </strong></span>
            <span>{genres.map(g => g.name)}</span>
          </div>}
          {homepage &&
          <div className="description">
            <span><strong>Home Page:: </strong></span>
            <a
              href={homepage} 
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank" 
              className="movie-link" >
              {homepage}
            </a>
          </div>}
          {overview &&
          <div className="description">
            <span><strong>Overview: </strong></span>
            <span>{overview}</span>
          </div>}
          {release_date &&
          <div className="description">
            <span><strong>Release Date: </strong></span>
            <span>{release_date}</span>
          </div>}
          {revenue > 0 &&
          <div className="description">
            <span><strong>Revenue: </strong></span>
            <span>{`$${revenue}`}</span>
          </div>}
        </div>
        <div className="images-container">
          <img 
            className="image-detail"
            src={`${config.base_url}/${config.poster_sizes[3]}/${backdrop_path}`} 
            alt=""
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>No movie found with that ID</div>
    )
  }
}

export default MovieDetail;
