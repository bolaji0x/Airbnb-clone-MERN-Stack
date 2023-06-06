import React, { useEffect, useState } from 'react'
import LuxeLogo from './LuxeLogo'
import { FaBars, FaGlobe, FaSearch, FaShare, FaUserCircle, FaHeart } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { PaystackButton } from 'react-paystack';
import SingleListingImg from './SingleListingImg'

const initialState = {
  checkinTime: '',
  checkoutTime: '',
  guestNo: 0
}


const SingleListing = () => {
  const {id} = useParams()

  const {user, isLoading, displayAlert, listing, getSingleListing, createBooking} = useAppContext()
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const [values, setValues] = useState(initialState)
  const [listingId, setListingId] = useState(id)

  
  const [email, setEmail] = useState('testUser1@email.com');
  const [name, setName] = useState('testUser1');
  const [phone, setPhone] = useState('08100000000');


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    //e.preventDefault();
    //setListingId('')
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
    createBooking(myForm);
  }

  useEffect(() => {
    getSingleListing(id) 
    // eslint-disable-next-line 
  }, [])

if (!listing) {
  return (
    <div>
      <h1 className='no-listing'>Listing Not Found</h1>
      <div className='refresh-btn'>
        <button className='refresh-discover' onClick={() => getSingleListing(id)}>Refresh Page</button>
    </div>
    </div>
  )
} else {
  const {title, description, images, guestNo, bedroomNo, bedNo, price, checkinTime, checkoutTime } = listing


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
  
  let subtotal = 0;
  let stayDuration = 0;

  if (values.checkinTime && values.checkoutTime) {
    const checkin = new Date(values.checkinTime);
    const checkout = new Date(values.checkoutTime);
    stayDuration = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)); // Convert to days

    subtotal = price * values.guestNo * stayDuration;
  }

  let tax = 0.075 * subtotal;
  tax = Math.min(tax, 999).toFixed(3);
  const amount = Number(subtotal) + Number(tax);


  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Reserve',
    onSuccess: ({ reference }) => {
      alert(
        `Your booking was successful! Transaction reference: ${reference}`
      );
      handleSubmit()
      resetForm();
    },
    onClose: () => {
      
      alert("Wait! You need this oil, don't go!!!!")
    },
  };

  
  return (
    <>
      <header className='header listing-nav'>
        <nav className='nav-container'>
          <div><LuxeLogo /></div>

          <div className='lsearch-cont'>
            <input type='search' className='lsearch-input' placeholder='Start your search' />
            <div className='lsearch-btn'><FaSearch className='lsearch-icon' /></div>
          </div>

          <div className='right-nav'>
            <button type='button' className='ayh-btn each-rn'>Airbnb your home</button>
            <button type='button' className='each-rn'><FaGlobe className='globe-btn' /></button>

            <Link to='/signup' className='bar-user-btn each-rn'>
              <button type='button'><FaBars className='bar-icon' /></button>
              <button type='button'><FaUserCircle className='user-icon' /></button>
            </Link>

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

                <SingleListingImg id={id} title={title} images={images} />
                {/*
                <div className='box2'><img className='listing-img' src={images[0]} alt={title} /></div>

              */}
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
  
          <div className='checkout-container'>
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
                        min={formattedCheckin}
                        max={formattedCheckout}
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
                        min={formattedCheckin}
                        max={formattedCheckout}
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
                      min={1}
                      max={guestNo}
                      onChange={handleChange} 
                    />
                  </div>
                </div>


                {user && <PaystackButton disabled={isLoading} {...componentProps} className='checkout-btn' />}
                <div className='lcout-cont'>{!user && <Link to='/signup' className=' lcout-btn'>Login as user to checkout</Link>}</div>
                {/*(<button type='submit' disabled={isLoading} className='checkout-btn'>Reserve</button> */}

                <p className='cout-text ywct'>You won't charged yet</p>

                <div className='checkout-btm'>
                  <h3 className='listing-link'>${price} X {stayDuration} nights X Number of guests </h3>
                  <h3 className='cout-text'>${subtotal}</h3>
                </div>

                <div className='checkout-btm'>
                  <h3 className='cout-btext'>Total before taxes</h3>
                  <h3 className='cout-btext'>${subtotal}</h3>
                </div>
              </div>

          </div>

          
        </div>
        
      
 
      </div>
    </>
    )
  }
}

export default SingleListing