import React, { useEffect } from 'react'
import Booking from './Booking'
import { useAppContext } from '../context/appContext'
const BookingsContainer = () => {
  const { getHostBookings, orders } = useAppContext()

  useEffect(() => {
    getHostBookings()
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      {orders.map((order) => {
        return (<Booking key={order._id} {...order}/>)
      })}  
    </div>
  )
}

export default BookingsContainer