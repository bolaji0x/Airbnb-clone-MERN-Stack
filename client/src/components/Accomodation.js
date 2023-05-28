import React from 'react'


const Accomodation = ({_id, images, title, checkinTime, checkoutTime, price, description }) => {
  const truncatedDescription = description.length > 20 ? `${description.substring(0, 200)}...` : description;
  return (
    <div className='booking-content' >
      <img className='booking-img' src={images[0]} alt={title} />
      <div className='booking-texts'>
          <h4 className='booking-title'>{title}</h4>
          <p className='booking-desc'>{truncatedDescription}</p>
      </div>
    </div>
  )
}

export default Accomodation

{/* 
<div className='booking-content' >
      <img className='booking-img' src={images[0]} alt={title} />
      <div className='booking-texts'>
          <h4 className='booking-title'>{title}</h4>
          <div className='booking-label-icon'>
              <div className='each-bli'>
                  <FaMoon className='bli-icon' />
                  <label className='bli-text'>6 nights</label>
              </div>
              <div className='each-bli'>
                  <FaCalendar className='bli-icon' />
                  <label className='bli-text'>2023-01-15</label>
                  <FaArrowRight className='bli-icon ar-icon' />
                  <FaCalendar className='bli-icon' />
                  <label className='bli-text'>2023-01-15</label>
              </div>
          </div>
          <div className='booking-btm'>
              <FaIdCard className='card-icon' />
              <h3 className='bbtm-text'>Total price: $1200</h3>
          </div>
      </div>
    </div>

*/}
