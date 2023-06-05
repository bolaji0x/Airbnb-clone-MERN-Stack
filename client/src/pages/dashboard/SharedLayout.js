import React from 'react'
import { Navbar, NavTabs } from '../../components'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <main className='account'>
      <div className='auth-nav'>
        <Navbar />
      </div>
      <div className='dashboard-page'>
        <div className='home-head'><NavTabs /></div>
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default SharedLayout