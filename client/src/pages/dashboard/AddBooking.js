import React from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { FormRow } from '../../components'

const AddBooking = () => {
  return (
    <>
        <div className='accomodations-container profile-container bd-container'>
            <form className='create-form'>
                <div className='each-create-input'>
                    <p className='eci-desc'>Title for your place, should be short and catchy as in advertisement</p>
                    <FormRow type='text' labelText='Title' />
                </div>
                <div className='each-create-input'>
                    <p className='eci-desc'>Address to this place</p>
                    <FormRow type='text' labelText='Address' />
                </div>
                <div className='each-create-input'>
                    <label className='eci-text'>Photos</label>
                    <div className='upload-img-btn'>
                        <div><img src='' className='upload-img' alt='booking-img' /></div>
                        <div className='upload-btn-section'>
                            <label className='upload-btn-cont' htmlFor='files'>
                                <BiCloudUpload className='cloud-btn' />
                                <span>Upload</span>
                            </label>
                            <input
                                type="file"
                                id='files'
                                className='upload-btn'
                                name="photo"
                                accept=".png, .jpg, .jpeg"
                                multiple 
                                
                            />
                        </div>
                    </div>                    
                </div>

                <div className='each-create-input'>
                    <label className='eci-desc'>Description to this place</label>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="Description"
                    ></textarea>
                </div>
                <div className='each-create-input'>
                    <label className='eci-desc'>Extra info</label>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="Extra Info"
                    ></textarea>
                </div>

                <div className='each-create-input'>
                    <label>Check in & Chekout times</label>
                    <div>
                        <div><FormRow type='number' labelText='Check in time' /></div>
                        <div><FormRow type='number' labelText='Check out time' /></div>
                        <div><FormRow type='number' labelText='Max number of guests' /></div>
                        <div><FormRow type='number' labelText='Price per night' /></div>
                    </div>
                </div>
                <button type='submit' className='btn login-btn' >Save</button>
            </form>
        </div>
    </>
  )
}

export default AddBooking