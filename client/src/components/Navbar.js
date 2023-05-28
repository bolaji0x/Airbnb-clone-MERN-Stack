

import React, { useState } from 'react'
import Logo from './Logo'
import { FaBars, FaGlobe, FaSearch, FaUserCircle } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { SearchContainer } from '../components'

const Navbar = () => {

  const [showSearch, setShowSearch] = useState(false)

  const toggleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div>
      <header className='header'>
        <nav className='nav-container'>
          <div className='airbnb-logo'><Logo /></div>


          <div className='any-input'>
            <div className='any-container'>
              <button onClick={toggleShowSearch} className='search-btn any-search'>
                <FaSearch className='search-icon' />
              </button>

              {!showSearch && (
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
              )}

            {showSearch && (
              <div className='search-tab'>
                <SearchContainer />
              </div>
            )}
              

              
            </div>

            
            
          </div>

          <div className='right-nav'>
            <Link to='/signup' className='air-globe-btn'>
              <button className='ayh-btn each-rn'>Airbnb your home</button>
              <FaGlobe className='globe-btn' />
            </Link>

            <Link to='/signup' className='bar-user-btn each-rn'>
              <button type='button'><FaBars className='bar-icon' /></button>
              <button type='button'><FaUserCircle className='user-icon' /></button>
            </Link>

          </div>
          
        </nav>
      

      
      </header>
    
    </div>
    
  )
}

export default Navbar

