import React from 'react'
import { useAppContext } from '../../context/appContext'
import { AccomodationContainer, PageBtnContainer } from '../../components'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const AllAccommodations = () => {
  const { numOfPages } = useAppContext()
  return (
    <>
        <div>
          <div className='bookings-container profile-container bd-container'>
            <Link to='/add-booking' className='add-bbtn'>
              <FaPlus className='addb-icon' /> 
              <label className='addb-text'>Add new place</label>
            </Link>
            <AccomodationContainer />
          </div>

          <div >{numOfPages > 1 && <PageBtnContainer />}</div>

        </div>
    </>
  )
}

export default AllAccommodations