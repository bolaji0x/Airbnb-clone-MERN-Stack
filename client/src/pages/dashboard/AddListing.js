import React, { useState } from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { FormRow, Alert, LoadingModal } from '../../components'
import { useAppContext } from '../../context/appContext'

const initialState = {
    title: '',
    description: '',
    price: '',
    address: '',
    guestNo: '',
    bedroomNo: '',
    bedNo: '',
    checkinTime: '',
    checkoutTime: ''
}

const AddListing = () => {
    const { showAlert, createListing, displayAlert, isLoading } = useAppContext()
    const [values, setValues] = useState(initialState);
    const today = new Date().toISOString().split('T')[0];

    const [checkinTime, setCheckinTime] = useState('');
    const [checkoutTime, setCheckoutTime] = useState('');

    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const clearFormFields = () => {
        setValues({
            title: '',
            description: '',
            price: '',
            address: '',
            guestNo: '',
            bedroomNo: '',
            bedNo: '',
            checkinTime: '',
            checkoutTime: ''
        });

        setCheckinTime('')
        setCheckoutTime('')
        setSelectedImages([])
        setImagePreviews([])
      };
      
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
    
        setSelectedImages(files);
    
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();



        const { title, description, price, address, guestNo, bedroomNo, bedNo } = values

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

        createListing(myForm, clearFormFields);
           
          
    }
    
  return (
    <>
        <div className='profile-container bd-container'>
            <form encType='multipart/form-data' className='create-form' onSubmit={handleSubmit}>
                {showAlert && <Alert />}
                <FormRow 
                    type='text' 
                    value={values.title}
                    labelText='Title' 
                    name='title'
                    handleChange={handleChange}
                />

                <div className='form-item each-create-input'>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                    />
                    <label className="">Description</label>
                </div>


                <FormRow 
                    type='number'
                    name='price'
                    value={values.price} 
                    labelText='Price per night'
                    handleChange={handleChange} 
                />

                <div className='form-item each-create-input'>
                    <textarea
                        type="text"
                        className='caption-input'
                        required
                        name="address"
                        value={values.address}
                        onChange={handleChange}
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
                                onChange={handleImageChange}     
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
                    value={values.bedroomNo}
                    handleChange={handleChange}
                    labelText='Bedroom Number'
                    min={1} 
                />

                <FormRow 
                    type='number'
                    name='bedNo'
                    value={values.bedNo}
                    handleChange={handleChange} 
                    labelText='Bed Number'
                    min={1}
                />
                
                <FormRow 
                    type='number'
                    name='guestNo'
                    value={values.guestNo}
                    handleChange={handleChange} 
                    labelText='Max number of guests' 
                    min={1}
                />

                <div className='each-form-date'>
                    <label className=''>Check in time</label>
                    <FormRow 
                        type="date"
                        value={checkinTime}
                        handleChange={(e) => setCheckinTime(e.target.value)}
                        min={today}  
                    />
                </div>

                <div className='each-form-date'>
                    <label className=''>Check out time</label>
                    <FormRow 
                        type="date" 
                        value={checkoutTime}
                        handleChange={(e) => setCheckoutTime(e.target.value)}
                        min={today}
                    />
                </div>
                <button disabled={isLoading} type='submit' className='btn login-btn' >Submit</button>
            </form>
        </div>
        {isLoading && <LoadingModal />}
    </>
  )
}

export default AddListing