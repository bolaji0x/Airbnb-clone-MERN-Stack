

import React from 'react'
import Logo from './Logo'
import { FaBars, FaGlobe, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Navbar = () => {

  return (
    <div>
      <header className='header'>
        <nav className='nav-container'>
          
          <Link to='/homepage' className='airbnb-logo'><Logo /></Link>
            
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

