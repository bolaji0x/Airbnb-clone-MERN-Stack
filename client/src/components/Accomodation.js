import React from 'react'
import { Link } from 'react-router-dom';


const Accomodation = ({_id, images, title, checkinTime, checkoutTime, price, description }) => {
  const truncatedDescription = description.length > 20 ? `${description.substring(0, 200)}...` : description;
  return (
    <Link to={`/edit-booking/${_id}`} className='booking-content' >
      <img className='booking-img' src={images[0]} alt={title} />
      <div className='booking-texts'>
          <h4 className='booking-title'>{title}</h4>
          <p className='booking-desc'>{truncatedDescription}</p>
      </div>
    </Link>
  )
}

export default Accomodation


