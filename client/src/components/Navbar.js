

import React, { useState } from 'react'
import Logo from './Logo'
import { FaBars, FaBed, FaBox, FaBuilding, FaFilter, FaGlobe, FaGreaterThan, FaHockeyPuck, FaHotjar, FaLaptopHouse, FaMugHot, FaRedhat, FaSearch, FaSort, FaUmbrellaBeach, FaUserCircle, FaWater } from 'react-icons/fa'
import { BiChevronLeft, BiChevronRight, BiSort } from 'react-icons/bi'

const Navbar = () => {

  return (
    <div>
      <header className='header'>
        <nav className='nav-container'>
          <div className='airbnb-logo'><Logo /></div>

          <div className='any-container'>
            <button className='search-btn any-search'>
              <FaSearch className='search-icon' />
            </button>

            <div className='any-content'>
              <div>
                <button className='any-btn each-any anywhere-btn'>Anywhere</button>
              </div>
              <div className='week-guest'>
                <button className='any-btn each-any anyg'>Anyweek</button>
                <div className='add-guest'>
                  <label className='guest-label each-any anyg'>Add guests</label>
                  
                </div>
              </div>
            </div>

            
            <div className='filter-btn any-filter-btn'>
              <BiSort className='filter-icon' />
            </div>
            
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
    
    </div>
    
  )
}

export default Navbar

