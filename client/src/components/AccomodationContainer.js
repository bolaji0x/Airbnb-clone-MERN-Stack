import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {Loading} from '.'
import Accomodation from './Accomodation'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const AccomodationContainer = () => {
  const { isLoading, page, getUserListings, listings } = useAppContext()

  useEffect(() => {
    getUserListings()
    // eslint-disable-next-line
  }, [page])

  
  if(isLoading) {
    return (<Loading />)
  }

  if(listings.length === 0) {
    return (
    <div className='refresh-btn'>
      <button className='refresh-discover' onClick={() => getUserListings()}>Refresh Page</button>
    </div>
    )
  }  


  return (
    <>
      <div className=''>
        <Link to='/add-booking' className='add-bbtn'>
          <FaPlus className='addb-icon' /> 
          <label className='addb-text'>Add new place</label>
        </Link>
        {listings.map((listing) => {
          return (<div className='pl-link' key={listing._id} ><Accomodation key={listing._id} {...listing} /></div>)
        })}
      </div>
    </>
  )
}

export default AccomodationContainer