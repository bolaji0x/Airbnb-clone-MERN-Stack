import React from 'react'
import { ListingContainer, Navbar, Footer, TabsContainer } from '../components'
const Landing = () => {
  return (
    <>
      <div className='bd-container'>
        <Navbar />
        <TabsContainer />
        <ListingContainer />
        <Footer />
      </div>
    </>
  )
}

export default Landing