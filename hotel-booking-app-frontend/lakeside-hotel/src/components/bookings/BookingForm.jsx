import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import BookingSummary from './BookingSummary';


const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: 0,
    numOfChildren: 0,
  });
  const [roomInfo, setRoomInfo] = useState({
    photo: '',
    roomType: '',
    roomPrice: 0
  });

  const {roomId} = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setBooking({...booking, [name]: value});
    setErrorMessage("");
  }

  const getRoomPriceById = async (roomId) => {
    try{
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    }catch(error){
      throw new Error(error);
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId])

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const price = roomPrice? roomPrice : 0;
    console.log("payment", diffInDays * price);
    return diffInDays * price
  }

  const isGuestValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1
  }

  const isCheckOutDateValid = () => {
    if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
      setErrorMessage("Check-out date must come before check-in date");
      return false;
    }else{
      setErrorMessage("");
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false || !isGuestValid() || !isCheckOutDateValid()){
      e.stopPropagation();
    }else{
      setIsSubmitted(true);
    }
    setIsValidated(true);
  }

  const handleBooking = async() => {
    try{
      const confirmationCode = await bookRoom(roomId, booking);
      console.log(confirmationCode);
      setIsSubmitted(true);
      navigate("/booking-success", {state: {message: confirmationCode}});
    }catch(error){
      setErrorMessage(error.message);
      navigate("/booking-success", {state: {error: errorMessage}});
    }
  }

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card-title mb-3">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit} >
                <FormGroup>
                  <FormLabel className='hotel-color' htmlFor='guestFullName'>Full Name : </FormLabel>
                  <FormControl 
                    required 
                    type='text' 
                    id='guestFullName' 
                    name='guestFullName' 
                    value={booking.guestFullName}
                    placeholder='Enter your Full name'
                    onChange={handleInputChange}
                    />
                  <FormControl.Feedback type='invalid'>
                    Please enter your fullname
                  </FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                  <FormLabel className='hotel-color' htmlFor='guestEmail'>Email : </FormLabel>
                  <FormControl 
                    required 
                    type='email' 
                    id='guestEmail' 
                    name='guestEmail' 
                    value={booking.guestEmail}
                    placeholder='Enter your Email'
                    onChange={handleInputChange}
                    />
                  <FormControl.Feedback type='invalid'>
                    Please enter your email
                  </FormControl.Feedback>
                </FormGroup>
                <fieldset style={{ border: '2px' }}>
                  <legend>Logging period</legend>
                  <div className='row'>
                    <div className="col-6">
                      <FormLabel className='hotel-color' htmlFor='checkInDate'>Check-In date : </FormLabel>
                      <FormControl 
                        required 
                        type='date' 
                        id='checkInDate' 
                        name='checkInDate' 
                        value={booking.checkInDate}
                        placeholder='Check-in date'
                        onChange={handleInputChange}
                        />
                      <FormControl.Feedback type='invalid'>
                        Please Select check-in date
                      </FormControl.Feedback>
                    </div>

                    <div className="col-6">
                      <FormLabel className='hotel-color' htmlFor='checkOutDate'>Check-Out date : </FormLabel>
                      <FormControl 
                        required 
                        type='date' 
                        id='checkOutDate' 
                        name='checkOutDate' 
                        value={booking.checkOutDate}
                        placeholder='Check-out date'
                        onChange={handleInputChange}
                        />
                      <FormControl.Feedback type='invalid'>
                        Please Select check-out date
                      </FormControl.Feedback>
                    </div>
                    {errorMessage && (
                        <p className='error-message text-danger'>{errorMessage}</p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Number of guest</legend>
                  <div className='row'>
                    <div className="col-6">
                      <FormLabel className='hotel-color' htmlFor='numOfAdults'>Number of adults : </FormLabel>
                      <FormControl 
                        required 
                        type='number' 
                        id='numOfAdults' 
                        name='numOfAdults' 
                        value={booking.numOfAdults}
                        placeholder='0'
                        min={1}
                        onChange={handleInputChange}
                        />
                      <FormControl.Feedback type='invalid'>
                        Please Select at least 1 adult.
                      </FormControl.Feedback>
                    </div>

                    <div className="col-6">
                      <FormLabel className='hotel-color' htmlFor='numOfAdults'>Number of Children : </FormLabel>
                      <FormControl 
                        required 
                        type='number' 
                        id='numOfChildren' 
                        name='numOfChildren' 
                        value={booking.numOfChildren}
                        placeholder='0'
                        min={0}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="form-group my-2">
                  <button type="submit" className='btn btn-hotel'>Continue</button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-6">
            {isSubmitted && (
              <BookingSummary 
                booking={booking} 
                payment={calculatePayment()} 
                isFormValid={isValidated} 
                onConfirm={handleBooking}
              />
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default BookingForm