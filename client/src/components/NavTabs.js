import React from 'react'
import { FaArrowRight, FaBars, FaCalendar, FaHome, FaIdCard, FaMoon, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const NavTabs = () => {
  return (
    <>
      <div>
            <div className='profile-content'>
                <div className='profile-head'>
                    <Link to='' className='each-tab-btn'>
                        <FaUser className='each-tab-icon' />
                        <label className='each-tab-label'>My Profile</label>
                    </Link>
                    <Link to='/all-bookings' className='each-tab-btn'>
                        <FaBars className='each-tab-icon' />
                        <label className='each-tab-label'>My Bookings</label>
                    </Link>
                    <Link to='/add-booking' className='each-tab-btn'>
                        <FaHome className='each-tab-icon' />
                        <label className='each-tab-label'>My Accomodations</label>
                    </Link>
                </div>

                
            </div>
        </div>
    </>
  )
}

export default NavTabs