import React, { useState, useEffect } from 'react'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'

const initialState = {
  email: '',
  name: '',
  lastName: '',
  password: '',
  isMember: true
}

const Register = () => {
  const navigate = useNavigate()
  const { user, setupUser, showAlert, isLoading, displayAlert } = useAppContext()

  const [values, setValues] = useState(initialState)
  
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, name, lastName, password, isMember} = values

    if(!email|| !password || (!isMember && !name && !lastName )) {
      displayAlert()
      return
    }
    const currentUser = new FormData();

    currentUser.set("email", values.email);
    currentUser.set("name", values.name);
    currentUser.set("lastName", values.lastName);
    currentUser.set("password", values.password);
    
    if (values.isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  };
  
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <section>
      <div className='form-container'>
        <form 
          encType="multipart/form-data"  className='form-section' 
          onSubmit={handleSubmit}
        >
        <h3 className='register-title'>{values.isMember ? 'Log in ' : 'Sign up'}</h3>
        <h4>Welcome to Airbnb</h4>
        {showAlert && <Alert />}
        {!values.isMember && (
        <div>
          {/* name */}
          <FormRow
            type='text'
            name='name'
            placeholder='Name'
            value={values.name}
            labelText='Name'
            handleChange={handleChange}
          />
          {/* lastName */}
          <FormRow
            type='text'
            name='lastName'
            placeholder='LastName'
            value={values.lastName}
            labelText='lastName'
            handleChange={handleChange}
          />
      
        </div>
        )}
        {/* email */}
          <FormRow
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            labelText='Email'
            handleChange={handleChange}
         />
        {/* password */}
        <FormRow
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          labelText='Password'
          handleChange={handleChange}
        />
        {values.isMember ? 
        <div className='rmb-flex'>
          <button className='bregister-btn'>Forgot Password</button>
        </div>
        :   
        <p className='rmb-info'>We'll Call or text mail you to confirm your mail.Standard message and data rates apply</p>
      }
        
        {/* btn container */}
        <button type='submit' className='btn login-btn' disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <p className='enq-btn-section'>
          <span className='enq-name'>{values.isMember ? `Don't have an account?` : 'Already have an account?'}</span>
          <button type='button' onClick={toggleMember} className='bregister-btn'>
            {values.isMember ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        </form>
      </div>
      </section>
    </React.Fragment>
      
  )
}
export default Register
