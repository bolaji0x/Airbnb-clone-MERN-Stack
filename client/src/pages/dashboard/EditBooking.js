import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FormRow } from '../../components'
import { BiCloudUpload } from "react-icons/bi";
import { useAppContext } from '../../context/appContext';
import { useParams } from 'react-router-dom'

const EditBooking = () => {
    const {id} = useParams()
    const {
        isLoading,
        displayAlert,
        showAlert,
        updateListing
    } = useAppContext()


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [address, setAddress] = useState('')
    const [guestNo, setGuestNo] = useState(0)
    const [bedroomNo, setBedroomNo] = useState('')
    const [bedNo, setBedNo] = useState('')
    const [checkinTime, setCheckinTime] = useState('');
    const [checkoutTime, setCheckoutTime] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Prepend '0' if necessary
        const day = ('0' + date.getDate()).slice(-2); // Prepend '0' if necessary
        const formattedDate = `${year}-${month}-${day}`;
      
        return formattedDate;
      };
    
    const formattedCheckin = formatDate(checkinTime);
    const formattedCheckout = formatDate(checkoutTime);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`/api/v1/listings/${id}`)
            const {listing} = data
            console.log(listing)
            setTitle(listing.title)
            setDescription(listing.description)
            setAddress(listing.address)
            setPrice(listing.price)
            setGuestNo(listing.guestNo)
            setBedroomNo(listing.bedroomNo)
            setBedNo(listing.bedNo)
            setCheckinTime(listing.checkinTime)
            setCheckoutTime(listing.checkoutTime)
            setImagePreviews(listing.images)
          } catch (error) {
            console.log(error)
          }
        };
        fetchData();
    }, [id])

    const updateListingImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setSelectedImages(files);
    
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if(!title ||!description || !price || !address || !guestNo || !bedroomNo || !bedNo || !checkinTime || !checkoutTime) {
            displayAlert()
            return
        }
        const myForm = new FormData();  
          
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("price", price);
        myForm.append('address', address)
        myForm.append('guestNo', guestNo)
        myForm.append('bedroomNo', bedroomNo)
        myForm.append('bedNo', bedNo)
        myForm.append('checkinTime', checkinTime)
        myForm.append('checkoutTime', checkoutTime)
          
        selectedImages.forEach((image) => {
            myForm.append('images', image);
        });

        updateListing(id, myForm);
           
          
    }    

  return (
        <div className='accomodations-container profile-container bd-container'>
            <form encType='multipart/form-data' className='create-form' onSubmit={handleSubmit}>
                {showAlert && <Alert />}
                <FormRow 
                    type='text' 
                    value={title}
                    labelText='Title' 
                    name='title'
                    handleChange={(e) => setTitle(e.target.value)}
                />

                <div className='form-item each-create-input'>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className="">Description</label>
                </div>


                <FormRow 
                    type='number'
                    name='price'
                    value={price} 
                    labelText='Price per night'
                    handleChange={(e) => setPrice(e.target.value)} 
                />

                <div className='form-item each-create-input'>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="">Address</label>
                </div>                

                <div className='each-create-input'>
                    <h3 className='eci-text'>Photos</h3>
                    <div className='uploader'>
                        <div>
                            <label className='upload-btn-cont' htmlFor='files'>
                                <BiCloudUpload className='cloud-btn' />
                                <span>Upload</span>
                            </label>
                            <input
                                type="file"
                                id='files'
                                className='upload-btn'
                                name="images"
                                accept=".png, .jpg, .jpeg"
                                multiple
                                onChange={updateListingImagesChange}     
                            />
                        </div>
                        <div>
                            {imagePreviews.map((previewUrl) => (
                            <img key={previewUrl} src={previewUrl} className='preview-img' alt="preview" />
                            ))}
                        </div>
                    </div>                    
                </div>

                <FormRow 
                    type='number' 
                    name='bedroomNo'
                    value={bedroomNo}
                    handleChange={(e) => setBedroomNo(e.target.value)}
                    labelText='Bedroom Number' 
                />

                <FormRow 
                    type='number'
                    name='bedNo'
                    value={bedNo}
                    handleChange={(e) => setBedNo(e.target.value)} 
                    labelText='Bed Number' 
                />
                
                <FormRow 
                    type='number'
                    name='guestNo'
                    value={guestNo}
                    handleChange={(e) => setGuestNo(e.target.value)} 
                    labelText='Max number of guests' 
                />

                <div className='each-form-date'>
                    <label className=''>Check in time</label>
                    <FormRow 
                        type="date"
                        value={formattedCheckin}
                        handleChange={(e) => setCheckinTime(e.target.value)}  
                    />
                </div>

                <div className='each-form-date'>
                    <label className=''>Check out time</label>
                    <FormRow 
                        type="date" 
                        value={formattedCheckout}
                        handleChange={(e) => setCheckoutTime(e.target.value)}
                    />
                </div>
                <button disabled={isLoading} type='submit' className='btn login-btn' >Update Listing</button>
            </form>
        </div>
  )
}

export default EditBooking 