import React from 'react'
import { Navbar, NavTabs } from '../../components'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <main>
      <Navbar />
      <div className='dashboard-page'>
        <NavTabs />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default SharedLayout