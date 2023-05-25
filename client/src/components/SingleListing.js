import React, { useEffect, useState } from 'react'
import LuxeLogo from './LuxeLogo'
import { FaBars, FaGlobe, FaSearch, FaShare, FaUserCircle, FaHeart } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { PaystackButton } from 'react-paystack';

const initialState = {
  checkinTime: '',
  checkoutTime: '',
  guestNo: 0
}


const SingleListing = () => {
  const {id} = useParams()

  const {isLoading, displayAlert, listing, getSingleListing, createOrder} = useAppContext()

  const [values, setValues] = useState(initialState)
  const [listingId, setListingId] = useState(id)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListingId('')
    const {checkinTime, checkoutTime, guestNo} = values 
    if(!listingId || !checkinTime || !checkoutTime || !guestNo) {
      displayAlert()
      return
    }
    const myForm = new FormData();
    myForm.set("listingId", listingId);
    myForm.set("checkinTime", checkinTime);
    myForm.set("checkoutTime", checkoutTime);
    myForm.set('guestNo', guestNo)
    createOrder(myForm);
  }

  useEffect(() => {
    getSingleListing(id) 
    // eslint-disable-next-line 
  }, [])

if (!listing) {
  return <h1 className='no-post'>Listing Not Found</h1>
} else {
  const {title, description, images, guestNo, bedroomNo, bedNo, price } = listing


  
  return (
    <>
      <header className='header'>
        <nav className='nav-container listing-nav'>
          <div><LuxeLogo /></div>

          <div className='lsearch-cont'>
            <input type='search' className='lsearch-input' placeholder='Start your search' />
            <div className='lsearch-btn'><FaSearch className='lsearch-icon' /></div>
          </div>

          <div className='right-nav'>
            <button type='button' className='ayh-btn each-rn'>Airbnb your home</button>
            <button type='button' className='each-rn'><FaGlobe className='globe-btn' /></button>
            <div className='bar-user-btn each-rn'>
              <button type='button'><FaBars className='bar-icon' /></button>
              <button type='button'><FaUserCircle className='user-icon' /></button>
            </div>

          </div>
        </nav>
      </header>


      <div className='listing-container bd-container'>

       
          <div>
              <div className='textimg-content'>
                <div className='box1'>
                  <h2 className='listing-htitle'>{title}</h2>
                  <div className='listing-head'>  
                    <div className='l-head'>
                      <h3 className='listing-link'>1 review</h3>
                      
                    </div>
                    <div className='l-head icon-flex'>
                    <div className='licon-text'>
                      <FaShare className='listing-icon' />
                      <h3 className='listing-link '>Share</h3>
                    </div>
                    <div className='licon-text lh-link'>
                      <FaHeart className='listing-icon' />
                      <h3 className='listing-link'>Save</h3></div>
                    </div>
                  </div>
                </div>
                <div className='box2'><img className='listing-img' src={images[0]} alt={title} /></div>
              </div>
              
          </div>

          
        



        <div className='lisitng-grid'>
          <div className='listing-textimg'>
            <div  className='listing-texts'>
                  <h1 className='slisting-title'>{title}</h1>
                  <div className='sltext-flex'>
                    <p className='slisting-text'>{guestNo} guests</p>
                    <p className='slisting-text'>{bedroomNo} bedrooms</p>
                    <p className='slisting-text'>{bedNo} beds</p>
                  </div>
            </div>

            <div className='listing-texts'>
                  <h3 className='listing-ctext'>The Space</h3>
                  <p className='slisting-text'>Please note; This property can be booked with less bathrooms. Contact the Designer</p>
                  
                  <p className='slisting-text sl-desc'>{description}</p>

                  <button type='button' className='listing-link'>Show more</button>
                  <p className='listing-ctext'>Hospitaliy by LUXURY RETREATS</p>
            </div>

            <div className='listing-images'>
              {images.map((image, index) => (
                <img className='listing-grid-img' key={index} src={image} alt={`${index}`} />
              ))}
      
            </div>
          </div>
  
          <form className='checkout-container' onSubmit={handleSubmit}>
              <div className='checkout-head'>
                <h3 className='cout-price'>${price} <span className='cout-text'>night</span></h3>
                <h3 className='listing-link'>1 review</h3>
              </div>

              <div>
                <div className='cbox'>
                  <div className='cbox-flex'>
                    <div className='each-cbox cin'>
                      <label className='cbox-text'>CHECK-IN</label>
                      <input 
                        className='cbox-date'
                        name='checkinTime' 
                        type='date' 
                        value={values.checkinTime}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='each-cbox cout'>
                      <label className='cbox-text'>CHECK-OUT</label>
                      <input 
                        className='cbox-date' 
                        name='checkoutTime'
                        type='date' 
                        value={values.checkoutTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='cbox-no each-cbox gno'>
                    <input 
                      className='guest-input' 
                      type='number'
                      name='guestNo' 
                      placeholder='Guest Number'
                      value={values.guestNo}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <button type='submit' disabled={isLoading} className='checkout-btn'>Reserve</button>

                <p className='cout-text ywct'>You won't charged yet</p>

                <div className='checkout-btm'>
                  <h3 className='listing-link'>$1,256 X 7 nights</h3>
                  <h3 className='cout-text'>$8,806</h3>
                </div>

                <div className='checkout-btm'>
                  <h3 className='cout-btext'>Total before taxes</h3>
                  <h3 className='cout-btext'>$8,806</h3>
                </div>
              </div>

          </form>

          
        </div>
        
      
 
      </div>
    </>
    )
  }
}

export default SingleListing