import React from 'react'
import { BiHeart, BiStar } from 'react-icons/bi'
import moment from 'moment'
import { Link } from 'react-router-dom';

import SingleFeedImg from './SingleFeedImg';
const Listing = ({_id, title, images, price, checkinTime, checkoutTime}) => {

  // Parse checkinTime and checkoutTime into Date objects
  const checkinDate = new Date(checkinTime);
  const checkoutDate = new Date(checkoutTime);

  const checkinFormatted = moment(checkinDate).format("MMM D");
  const checkoutFormatted = moment(checkoutDate).format("MMM D");

  // Generate the date range string
  const dateRange = `${checkinFormatted} - ${checkoutFormatted}`;
  return (
    <>
    <div className='listing-content'>
      <div className='each-listing'>

        <SingleFeedImg _id={_id} images={images} />
        <Link to={`/listing/${_id}`} className='listing-img-texts'>
          <span className='title-rating'>
            <h3 className='listing-title'>{title}</h3>
            <span className='star-icontext'>
              <BiStar className='star-icon' />
              <p className='star-text'>4.5</p>
            </span>
          </span>
          <p className='listing-text'>7,921 kilometeres away</p>
          <p className='listing-text'>{dateRange} </p>
          <h3 className='listing-price'>₦{price.toLocaleString()} night</h3>
          
          <div className='heart-btn'><BiHeart className='heart-icon' /></div>
        </Link>
      </div>

    </div>
    </>
  )
}

export default Listing