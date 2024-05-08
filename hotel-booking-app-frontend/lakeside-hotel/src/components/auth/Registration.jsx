import React, { useState } from 'react'
import {registerUser} from '../utils/ApiFunctions'
import { Link } from 'react-router-dom';

const Registration = () => {

  const [registration, setRegistration] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": ""
  })

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({...registration, [e.target.name]: e.target.value});
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    try{
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": ""
      })
    }catch(error){
      setSuccessMessage("");
      setErrorMessage(`Reistration error: ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 4000)
  }

  return (
    <section className='container col-6 my-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-success'>{successMessage}</p>}

      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>

        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="firstName">First Name</label>
          <div className="">
            <input 
              type="text" 
              className="form-control" 
              id="firstName" 
              name='firstName' 
              value={registration.firstName} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="email">LastName</label>
          <div className="">
            <input 
              type="text" 
              className="form-control" 
              id="lastName" 
              name='lastName' 
              value={registration.lastName} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
          <div className="">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name='email' 
              value={registration.email} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="email">Password</label>
          <div className="">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name='password' 
              value={registration.password} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <button 
            type='submit'
            className='btn btn-hotel'
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have account <Link to={"/login"}>login</Link>
          </span>
        </div>
      </form>


    </section>
  )
}

export default Registration