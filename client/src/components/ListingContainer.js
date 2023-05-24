import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Listing from './Listing'
import {Loading} from '.'

const ListingContainer = () => {
  const { isLoading, getListings, page, search, listings } = useAppContext()

  useEffect(() => {
    getListings()
    // eslint-disable-next-line
  }, [page, search])

  if(isLoading) {
    return (<Loading />)
  }

  if(listings.length === 0) {
    return (
    <div className='refresh-btn'>
      <button className='refresh-discover' onClick={() => getListings()}>Refresh Page</button>
    </div>
    )
  }

  return (
    <div className='listing-content'>
      {listings.map((listing) => {
        return (<div key={listing._id} className='pl-div'><Listing key={listing._id} {...listing} /></div>)
      })}
      
    </div>
  )
}

export default ListingContainer