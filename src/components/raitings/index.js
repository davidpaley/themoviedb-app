import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Raitings = ({ starSelected, handleStarSelected }) => {
  return (
    <div className="raiting-container">
      <span>Filter by rating:</span>
      <div className="rating">  
        <span 
          className={starSelected > 4 ? 'ratingSelected' : 'raitingWithoutCalor'}
          onClick={handleStarSelected(5)}>
            ☆
        </span>
        <span 
          className={starSelected > 3 ? 'ratingSelected' : 'raitingWithoutCalor'}
          onClick={handleStarSelected(4)}>
            ☆
        </span>
        <span 
          className={starSelected > 2 ? 'ratingSelected' : 'raitingWithoutCalor'}
          onClick={handleStarSelected(3)}>
            ☆
        </span>
        <span 
          className={starSelected > 1 ? 'ratingSelected' : 'raitingWithoutCalor'}
          onClick={handleStarSelected(2)}>
            ☆
        </span>
        <span 
          className={starSelected > 0 ? 'ratingSelected' : 'raitingWithoutCalor'}
          onClick={handleStarSelected(1)}>
            ☆
        </span>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/no-typos
Raitings.PropTypes = {
  starSelected: PropTypes.number,
  handleStarSelected: PropTypes.func,
};

export default Raitings;
