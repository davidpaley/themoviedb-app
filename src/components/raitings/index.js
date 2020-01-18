import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Raitings = ({ starSelected, handleStarSelected }) => {
  return (
    <div className={styles.raitingContainer}>
      <span>Filter by rating:</span>
      <div className={styles.rating}>  
        <span 
          className={starSelected > 4 ? styles.ratingSelected : styles.raitingWithoutCalor}
          onClick={handleStarSelected(5)}>
            ☆
        </span>
        <span 
          className={starSelected > 3 ? styles.ratingSelected : styles.raitingWithoutCalor}
          onClick={handleStarSelected(4)}>
            ☆
        </span>
        <span 
          className={starSelected > 2 ? styles.ratingSelected : styles.raitingWithoutCalor}
          onClick={handleStarSelected(3)}>
            ☆
        </span>
        <span 
          className={starSelected > 1 ? styles.ratingSelected : styles.raitingWithoutCalor}
          onClick={handleStarSelected(2)}>
            ☆
        </span>
        <span 
          className={starSelected > 0 ? styles.ratingSelected : styles.raitingWithoutCalor}
          onClick={handleStarSelected(1)}>
            ☆
        </span>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/no-typos
Raitings.propTypes = {
  starSelected: PropTypes.number,
  handleStarSelected: PropTypes.func,
};

export default Raitings;
