import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {Loading} from '.'
import Accomodation from './Accomodation'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const AccomodationContainer = () => {
  const { isLoading, page, getUserListings, listings, search } = useAppContext()

  useEffect(() => {
    getUserListings()
    // eslint-disable-next-line
  }, [page, search])

  
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
        
        {listings.map((listing) => {
          return (<div className='pl-link' key={listing._id} ><Accomodation key={listing._id} {...listing} /></div>)
        })}
      </div>
    </>
  )
}

export default AccomodationContainer