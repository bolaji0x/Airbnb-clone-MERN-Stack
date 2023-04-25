import React from 'react'
import Logo from './Logo'
import { FaBars, FaBed, FaBox, FaBuilding, FaFilter, FaGlobe, FaGreaterThan, FaHockeyPuck, FaHotjar, FaLaptopHouse, FaMugHot, FaRedhat, FaSearch, FaSort, FaUmbrellaBeach, FaUserCircle, FaWater } from 'react-icons/fa'
import { BiChevronRight, BiSort } from 'react-icons/bi'
const Navbar = () => {
  return (
    <div>
      <header className='header'>
        <nav className='nav-container'>
          <div><Logo /></div>

          <div className='any-container'>
            <button className='any-btn each-any'>Anywhere</button>
            <button className='any-btn each-any'>Anyweek</button>
            <div className='add-guest'>
              <label className='guest-label each-any'>Add guests</label>
              <button className='search-btn'><FaSearch className='search-icon' /></button>
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

      <div className='tabs-container'>
        <div className='tabs-content'>
          <div className='each-tab'>
            <FaUmbrellaBeach className='tab-icon' />
            <label className='tab-label'>Beachfront</label>
          </div>
          <div className='each-tab'>
            <FaLaptopHouse className='tab-icon' />
            <label className='tab-label'>Castles</label>
          </div>
          <div className='each-tab'>
            <FaHotjar className='tab-icon' />
            <label className='tab-label'>Trending</label>
          </div>
          <div className='each-tab'>
            <FaMugHot className='tab-icon' />
            <label className='tab-label'>Bed & breakfasts</label>
          </div>
          <div className='each-tab'>
            <FaWater className='tab-icon' />
            <label className='tab-label'>Lake</label>
          </div>
          <div className='each-tab'>
            <FaRedhat className='tab-icon' />
            <label className='tab-label'>OMG!</label>
          </div>
          <div className='each-tab'>
            <FaBed className='tab-icon' />
            <label className='tab-label'>Private rooms</label>
          </div>
          <div className='each-tab'>
            <FaHockeyPuck className='tab-icon' />
            <label className='tab-label'>Luxe</label>
          </div>
          <div className='each-tab'>
            <FaBox className='tab-icon' />
            <label className='tab-label'>Amazing views</label>
          </div>
          <div className='each-tab'>
            <FaBuilding className='tab-icon' />
            <label className='tab-label'>Mansions</label>
          </div>
        </div>

        <button className='next-tab-btn'><BiChevronRight className='next-tab-icon' /></button>

        <div className='filter-btn'>
          <BiSort className='filter-icon' />
          <label className='filter-label'>Filters</label>
        </div>

      </div>
      
    </div>
  )
}

export default Navbar