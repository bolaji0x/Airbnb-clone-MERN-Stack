import React, { useState } from 'react'
import Logo from './Logo'
import { FaBars, FaBed, FaBox, FaBuilding, FaFilter, FaGlobe, FaGreaterThan, FaHockeyPuck, FaHotjar, FaLaptopHouse, FaMugHot, FaRedhat, FaSearch, FaSort, FaUmbrellaBeach, FaUserCircle, FaWater } from 'react-icons/fa'
import { BiChevronLeft, BiChevronRight, BiSort } from 'react-icons/bi'


const tabs = [
  { icon: <FaUmbrellaBeach />, label: 'Beachfront' },
  { icon: <FaLaptopHouse />, label: 'Castles' },
  { icon: <FaHotjar />, label: 'Trending' },
  { icon: <FaMugHot />, label: 'Bed & breakfasts' },
  { icon: <FaWater />, label: 'Lake' },
  { icon: <FaRedhat />, label: 'OMG!' },
  { icon: <FaBed />, label: 'Private rooms' },
  { icon: <FaHockeyPuck />, label: 'Luxe' },
  { icon: <FaBox />, label: 'Amazing views' },
  { icon: <FaBuilding />, label: 'Mansions' }
];


const Navbar = () => {
  const [startIndex, setStartIndex] = useState(0);

  //const visibleTabs = tabs.slice(startIndex, startIndex + 5);

  const handleNextTabClick = () => {
    let nextIndex = startIndex + 1;
    if (nextIndex > tabs.length - 7) {
      nextIndex = tabs.length - 7;
    }
    setStartIndex(nextIndex);
  };
  
  const handlePrevTabClick = () => {
    let prevIndex = startIndex - 1;
    if (prevIndex < 0) {
      prevIndex = 0;
    }
    setStartIndex(prevIndex);
  };

  

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
        <div className='l-tabtn'>
          {startIndex > 0 && (
            <button className='toggle-tab-btn' onClick={handlePrevTabClick}>
              <BiChevronLeft className='next-tab-icon' />
            </button>
          )}
        </div>

        <div className='tabs-content'>
            {tabs.map((tab, index) => {
              if (index >= startIndex && index < startIndex + 7) {
                return (
                  <div className='each-tab' key={index}>
                    <button className='tab-icon'>{tab.icon}</button>
                    <label className='tab-label'>{tab.label}</label>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>


        <div className='r-tbatn'>
          {startIndex < tabs.length - 7 && (
            <button className='toggle-tab-btn' onClick={handleNextTabClick}>
              <BiChevronRight className='next-tab-icon' />
            </button>
          )}
        </div>

        <div className='filter-btn'>
          <BiSort className='filter-icon' />
          <label className='filter-label'>Filters</label>
        </div>

      </div>
      
    </div>
    
  )
}

export default Navbar