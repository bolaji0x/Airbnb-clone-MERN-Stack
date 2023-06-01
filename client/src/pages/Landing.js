import React from 'react'
import { ListingContainer, Navbar, Footer, TabsContainer } from '../components'
const Landing = () => {
  return (
    <>
      <div className=''>
        <div className='nav-tabs'>
          <Navbar />
          <TabsContainer />
        </div>

        <div className='bd-container listings-container'><ListingContainer /></div>
        <Footer />
      </div>
    </>
  )
}

export default Landing