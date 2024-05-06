import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions';

const FindBooking = () => {

  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: {id: '', roomType: ''},
    bookingConfirmationCode: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    guestFullName: '',
    guestEmail: '',
    numOfAdults: '', 
    numOfChildren: '',
    totalNumOfGuests: ''
  });

  const clearBookingInfo = {
    id: "",
    room: {id: ''},
    bookingConfirmationCode: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    guestFullName: '',
    guestEmail: '',
    numOfAdults: '', 
    numOfChildren: '',
    totalNumOfGuests: ''
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    }catch(error){
      setBookingInfo(clearBookingInfo);
      if(error.response && error.response.status === 404){
        setError(error.response.data.message);
      }else{
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  const handleBookingCancellation = async(bookingId) => {
    try{
      await cancelBooking(bookingId);
      setIsDeleted(true);
      setSuccessMessage("Booking has been deleted successfully");
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError(null);
    }catch(error){
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage(null);
      setIsDeleted(false);
    }, 2000);
  }

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Find My Booking</h2>
        <form className='col-md-6' onSubmit={handleFormSubmit}>
          <div className="input-group mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="confirmationCode" 
              name="confirmationCode" 
              value={confirmationCode} 
              onChange={handleInputChange}
              placeholder='Enter the booking confirmation code'
            />
            <button className="btn btn-hotel input-group-text">Find booking</button>
          </div>
        </form>
        {isLoading ? (
          <div><div>Finding booking ...</div></div>
        ): error ? (
          <div className='text-danger'>{error}</div>
        ): bookingInfo.bookingConfirmationCode? (
          <div className='col-md-6 mt-4 mb-5'>
            <h3>Booking Information</h3>
            <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
            <p>Booking ID : {bookingInfo.bookingId}</p>
            <p>Room Number : {bookingInfo.room.id}</p>
            <p>Room Type : {bookingInfo.room.roomType}</p>
            <p>Check-in Date : {bookingInfo.checkInDate}</p>
            <p>Check-out Date : {bookingInfo.checkOutDate}</p>
            <p>Full Name : {bookingInfo.guestFullName}</p>
            <p>Email : {bookingInfo.guestEmail}</p>
            <p>Adults : {bookingInfo.numOfAdults}</p>
            <p>Children : {bookingInfo.numOfChildren}</p>
            <p>Total Guest : {bookingInfo.totalNumOfGuests}</p>

            {!isDeleted && (
              <button 
                className='btn btn-danger' 
                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
              >Candel Booking</button>
            )}
          </div>
        ):(
          <div>Find booking ...</div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3" role='alert'>
            {successMessage}
          </div>
        )}
      </div>
    </>
  )
}

export default FindBooking