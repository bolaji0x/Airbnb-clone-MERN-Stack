import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import Listing from './Listing'
import {Loading} from '.'

const ListingContainer = () => {
  const { isLoading, getListings, page, search, listings } = useAppContext()

  const [showTotalPrice, setShowTotalPrice] = useState(true);

  const handleToggle = () => {
    setShowTotalPrice(!showTotalPrice);
  };

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
    <>
      <div className='toggle-price-container'>
            <div className="toggle-price-content bd-container">

            <div className='right-tpc'>
                <h3 className='dtp-text'>{showTotalPrice ? "Display total price" : "Hide total price"}</h3>
                <p className='fees-text'>Include all fess, before taxes</p>
            </div>

            <div>
                <label className="switch">
                <input type="checkbox" checked={!showTotalPrice} onChange={handleToggle} />
                <span className="slider round"></span>
                </label>
            </div>
            
            </div>
        </div>
        <div className='listing-content'>
          {listings.map((listing) => {
            return (<div key={listing._id} className='pl-div'><Listing key={listing._id} {...listing} /></div>)
          })}
      
    </div>
    </>
    
  )
}

export default ListingContainer