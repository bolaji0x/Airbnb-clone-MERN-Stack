import React, { useEffect } from 'react'
import Booking from './Booking'
import {Loading} from '.'
import { useAppContext } from '../context/appContext'

const BookingsContainer = () => {
  const { isLoading, getHostBookings, bookings, page, search } = useAppContext()

  useEffect(() => {
    getHostBookings()
    // eslint-disable-next-line
  }, [page, search])

  if(isLoading) {
    return (<Loading />)
  }

  if(bookings.length === 0) {
    return (
    <div className='refresh-btn'>
      <button className='refresh-discover' onClick={() => getHostBookings()}>Refresh Page</button>
    </div>
    )
  }

  return (
    <div>
      {bookings.map((booking) => {
        return (<Booking key={booking._id} {...booking}/>)
      })}  
    </div>
  )
}

export default BookingsContainer