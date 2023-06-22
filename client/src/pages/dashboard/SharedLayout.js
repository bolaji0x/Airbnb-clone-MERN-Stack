import React from 'react'
import { Navbar, NavTabs } from '../../components'
import { Link, Outlet } from 'react-router-dom'
import { FaExpandAlt } from 'react-icons/fa'
const SharedLayout = () => {
  return (
    <main className='account'>
      <div className=''>
        <Navbar />
      </div>
      <div className='dashboard-page'>
        <div className='home-head'><NavTabs /></div>
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>
      <Link to='/homepage' className='visit-site'>
        <h3 Link className='vs-link'>Visit Airbnb Site</h3>
        <FaExpandAlt className='vs-btn' />
      </Link>
    </main>
  )
}

export default SharedLayout