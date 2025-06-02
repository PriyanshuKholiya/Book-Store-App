import React, { useState } from 'react';

const Rating = ({ maxRating = 5, value = 0, onRate }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (rate) => {
    if (onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate) => {
    setHoveredRating(rate);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="rating" role="radiogroup" aria-label="Rating">
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        return (
          <span
            key={index}
            className={`star ${starRating <= (hoveredRating || value) ? 'filled' : ''}`}
            onClick={() => handleRating(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
            role="radio"
            aria-checked={starRating === value}
            aria-label={`${starRating} star${starRating > 1 ? 's' : ''}`}
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: starRating <= (hoveredRating || value) ? '#ffc107' : '#e4e5e9' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;