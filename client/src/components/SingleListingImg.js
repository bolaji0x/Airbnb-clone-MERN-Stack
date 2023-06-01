import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const SingleListingImg = ({ id, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };
  
    const goToNextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? prevIndex : prevIndex + 1));
    };
  
    return (
      <div className="airbnb-feed">
      <div className="image-container">
        <div
          className="listing-img"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} />
          ))}
        </div>
      </div>

      {images.length > 1 && currentIndex !== 0 && (
        <button className="prev-button" onClick={goToPrevImage}>
          <FiChevronLeft />
        </button>
      )}

      {images.length > 1 && currentIndex !== images.length - 1 && (
        <button className="next-button" onClick={goToNextImage}>
          <FiChevronRight />
        </button>
      )}
      </div>
    );
}

export default SingleListingImg