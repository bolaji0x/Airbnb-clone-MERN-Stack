import React from 'react'
import { FaArrowRight, FaCalendar, FaIdCard, FaMoon } from 'react-icons/fa'

const Booking = ({listingId, checkinTime, checkoutTime, total}) => {
  const checkin = new Date(checkinTime);
  const checkout = new Date(checkoutTime);
  const stayDuration = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Prepend '0' if necessary
    const day = ('0' + date.getDate()).slice(-2); // Prepend '0' if necessary
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  };

  const formattedCheckin = formatDate(checkinTime);
  const formattedCheckout = formatDate(checkoutTime);



  return (
    <>
      <div className='booking-content' >
        <img className='booking-img' src={listingId.images[0]} alt={listingId.title} />
        <div className='booking-texts'>
            <h4 className='booking-title'>{listingId.title}</h4>
            <div className='booking-label-icon'>
                <div className='each-bli'>
                    <FaMoon className='bli-icon' />
                    <label className='bli-text'>{stayDuration} nights</label>
                </div>
                <div className='each-bli'>
                    <FaCalendar className='bli-icon' />
                    <label className='bli-text'>{formattedCheckin}</label>
                    <FaArrowRight className='bli-icon ar-icon' />
                    <FaCalendar className='bli-icon' />
                    <label className='bli-text'>{formattedCheckout}</label>
                </div>
            </div>
            <div className='booking-btm'>
                <FaIdCard className='card-icon' />
                <h3 className='bbtm-text'>Total price: ₦{total}</h3>
            </div>
        </div>
      </div>
     
    </>
  )
}

export default Booking