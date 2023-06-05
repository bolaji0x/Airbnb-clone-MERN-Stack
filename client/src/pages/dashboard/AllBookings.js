import React from 'react'
import { useAppContext } from '../../context/appContext'
import { BookingsContainer, PageBtnContainer } from '../../components'
const AllBookings = () => {
  const { numOfPages } = useAppContext()
  return (

    <>
      <div>
        <div className='bookings-container profile-container bd-container'>
        <BookingsContainer />
        </div>

        <div >{numOfPages > 1 && <PageBtnContainer />}</div>
      </div>
    </>
    
  )
}

export default AllBookings