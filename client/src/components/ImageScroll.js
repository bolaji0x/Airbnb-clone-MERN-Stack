import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const ImageScroll = ({ images }) => {
  return (
    <ScrollMenu
    className='listing-feed-picture'
      data={images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} />
      ))}
    />
  );
};

export default ImageScroll;