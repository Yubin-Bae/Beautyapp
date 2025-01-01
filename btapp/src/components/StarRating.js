import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

function StarRating({ setRating, rating }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    const positionX = event.clientX - boundingRect.left;
    const starWidth = boundingRect.width / 5;
    const hoverStars = Math.ceil(positionX / starWidth * 2) / 2;
    setHoverRating(hoverStars);
  };

  const changeRating = () => {
    setRating(hoverRating); 
    setHoverRating(0); 
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverRating(0)}
      onClick={changeRating}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      <StarRatings
        rating={hoverRating || rating} 
        starRatedColor="yellow"
        numberOfStars={5}
        name="rating"
        starDimension="40px"
        starSpacing="5px"
        starHoverColor="gold"
        starEmptyColor="gray"
        half={true}
      />
      <p>별점: {hoverRating || rating} / 5</p>
    </div>
  );
}

export default StarRating;

