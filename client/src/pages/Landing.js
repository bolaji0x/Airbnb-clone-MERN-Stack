import React from 'react'
import { ListingContainer, Navbar, Footer, TabsContainer } from '../components'
const Landing = () => {
  return (
    <>
      <div className=''>
        <Navbar />
        <div className='bd-container'>
          <TabsContainer />
          <ListingContainer />
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default Landing