import React from 'react'

import { useAppContext } from '../../context/appContext'
const Profile = () => {
  const {  isLoading, user, logoutUser } = useAppContext()
  return (
    <>
        <div className='bookings-container profile-container bd-container'>
            <div className='prfile-content'>
                <div className='profile-texts'>
                    <h4 className='profile-text'>Logged in as {user?.name} {user?.lastName} {`(${user?.email})`}</h4>
                    <button disabled={isLoading} className='login-btn' onClick={logoutUser}>Logout</button>
                </div>
            </div>
        </div>

        



        
    </>
  )
}

export default Profile