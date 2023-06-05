import React, { useState } from 'react'
import { FaBars, FaHome, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const NavTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <div>
            <div className='profile-content'>
                <div className='profile-head'>
                    <Link 
                        to='/' 
                        className={`each-tab-btn ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => handleTabClick(0)}
                    >
                        <FaUser className={`each-tab-icon ${activeTab === 0 ? 'active' : ''}`} />
                        <label className='each-tab-label'>My Profile</label>
                    </Link>
                    <Link 
                        to='/all-bookings' 
                        className={`each-tab-btn ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabClick(1)}
                    >
                        <FaBars className={`each-tab-icon ${activeTab === 1 ? 'active' : ''}`} />
                        <label className='each-tab-label'>My Bookings</label>
                    </Link>
                    <Link 
                        to='/all-accommodations' 
                        className={`each-tab-btn ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => handleTabClick(2)}
                    >
                        <FaHome className={`each-tab-icon ${activeTab === 2 ? 'active' : ''}`} />
                        <label className='each-tab-label'>My Accomodations</label>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default NavTabs