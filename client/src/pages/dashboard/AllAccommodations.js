import React from 'react'
import { FaArrowRight, FaBars, FaCalendar, FaHome, FaIdCard, FaMoon, FaUser } from 'react-icons/fa'
import TestImg from '../../components/TestImg'
import { AccomodationContainer } from '../../components'
const AllAccommodations = () => {
  return (
    <>
        <div className='bookings-container profile-container bd-container'>
            <AccomodationContainer />
        </div>
    </>
  )
}

export default AllAccommodations