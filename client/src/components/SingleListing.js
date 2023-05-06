import React, { useEffect, useRef, useState } from 'react'
import LuxeLogo from './LuxeLogo'
import { FaBars, FaGlobe, FaSearch, FaShare, FaUserCircle, FaHeart } from 'react-icons/fa'

import TestImg from './TestImg'
const SingleListing = () => {
  
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
            <button className='ayh-btn each-rn'>Airbnb your home</button>
            <button className='each-rn'><FaGlobe className='globe-btn' /></button>
            <div className='bar-user-btn each-rn'>
              <button><FaBars className='bar-icon' /></button>
              <button><FaUserCircle className='user-icon' /></button>
            </div>

          </div>
        </nav>
      </header>


      <div className='listing-container bd-container'>

       
          <div>
              <div className='textimg-content'>
                <div className='box1'>
                  <h2 className='listing-htitle'>Villa Mirabelle</h2>
                  <div className='listing-head'>  
                    <div className='l-head'>
                      <h3 className='listing-link'>1 review</h3>
                      <h3 className='listing-link lh-link'>Terres Bassses California saint morress marting</h3>
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
                <div className='box2'><TestImg /></div>
              </div>
              
          </div>

          
        



        <div className='lisitng-grid'>
          <div>
            <div  className='listing-texts'>
                  <h1 className='slisting-title'>Luxury stay in tereees belles collective saint marting , st martin</h1>
                  <div className='sltext-flex'>
                    <p className='slisting-text'>10 guests</p>
                    <p className='slisting-text'>5 bedrooms</p>
                    <p className='slisting-text'>5 beds</p>
                    <p className='slisting-text'>5 baths</p>
                  </div>
            </div>

            <div className='listing-texts'>
                  <h3 className='listing-ctext'>The Space</h3>
                  <p className='slisting-text'>please note; This property can be booked with less bathrooms. Contatc trio Designer</p>

                  <p className='slisting-text'>se note; This property can be booked with less bathrooms. Contatc trio Designe</p>

                  <button className='listing-link'>Show more</button>
                  <p className='listing-ctext'>Hospitaliy by LUXURY RETREATS</p>
            </div>

            <div className='listing-images'>
                  <TestImg />
                  <TestImg />
                  <TestImg />
                  <TestImg />
                  <TestImg />
                  <TestImg />
            </div>
          </div>
  
          <div className='checkout-container'>
              <div className='checkout-head'>
                <h3 className='cout-price'>$1,258 <span className='cout-text'>night</span></h3>
                <h3 className='listing-link'>1 review</h3>
              </div>

              <div>
                <div className='cbox'>
                  <div className='cbox-flex'>
                    <div className='each-cbox cin'>
                      <label className='cbox-text'>CHECK-IN</label>
                      <input className='cbox-date' type='date' />
                    </div>
                    <div className='each-cbox cout'>
                      <label className='cbox-text'>CHECK-OUT</label>
                      <input className='cbox-date' type='date' />
                    </div>
                  </div>
                  <div className='cbox-no each-cbox gno'>
                    <input className='guest-input' type='number' placeholder='Guest Number' />
                  </div>
                </div>

                <button className='checkout-btn'>Reserve</button>
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

          </div>
        </div>
        
      
 
      </div>
    </>
  )
}

export default SingleListing