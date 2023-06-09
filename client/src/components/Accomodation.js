import React from 'react'
import { Link } from 'react-router-dom';

const Accomodation = ({_id, images, title, description }) => {
  const truncatedDescription = description.length > 20 ? `${description.substring(0, 100)}...` : description;
  return (
    <Link to={`/edit-listing/${_id}`} className='booking-content' >
      <img className='booking-img' src={images[0]} alt={title} />
      <div className='booking-texts'>
          <h4 className='booking-title'>{title}</h4>
          <p className='booking-desc'>{truncatedDescription}</p>
      </div>
    </Link>
  )
}

export default Accomodation


