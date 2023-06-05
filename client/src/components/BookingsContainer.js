import React, { useEffect } from 'react'
import Booking from './Booking'
import { useAppContext } from '../context/appContext'
const BookingsContainer = () => {
  const { getHostBookings, bookings, page, search } = useAppContext()

  useEffect(() => {
    getHostBookings()
    // eslint-disable-next-line
  }, [page, search])
  return (
    <div>
      {bookings.map((booking) => {
        return (<Booking key={booking._id} {...booking}/>)
      })}  
    </div>
  )
}

export default BookingsContainer