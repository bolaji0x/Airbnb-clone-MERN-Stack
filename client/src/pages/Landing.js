import React from 'react'
import { useAppContext } from '../context/appContext'
import { ListingContainer, Navbar, Footer, TabsContainer, PageBtnContainer } from '../components'
const Landing = () => {
  const { numOfPages } = useAppContext()

  return (
    <>
      <div className=''>
        <div className='nav-tabs'>
          <Navbar />
          <TabsContainer />
        </div>

        <div className='bd-container listings-container'><ListingContainer /></div>

        <div >{numOfPages > 1 && <PageBtnContainer />}</div>

        <Footer />
      </div>
    </>
  )
}

export default Landing