import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {

  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm()
    }, 3000)
  }

  useEffect(() => {
    if(isBookingConfirmed){
      navigate("/booking-success")
    }
  }, [isBookingConfirmed, navigate])


  return (
    <div className='card card-body mt-5'>
      <h4>Reservation Summary</h4>
      <p>FullName : <strong>{booking.guestName}</strong></p>
      <p>Email : <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
      <p>Check-out Date : <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
      <p>Number of Days : <strong>{numOfDays}</strong></p>
      <div className="mb-4">
        <h5 className='mb-3'>Number of guests</h5>
        <p className='mb-0'><strong>Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong></p>
        <p className='mb-0'><strong>Children : {booking.numOfChildren}</strong></p>
      </div>
      {payment > 0 ? (
        <>
          <p>Total Payment : <strong>${payment}</strong></p>

          {isFormValid && !isBookingConfirmed ? (
            <Button variant='success' onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                  Booking Confirmed, redirecting to payment...
                </>
              ): (
                "Confirm booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className='d-flex justify-content-center align-items-center'>
              <div className='spinner-border text-primary' role="status">
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          ): null}
        </>
      ): (
        <p className='text-danger'>Check-out date must be after check-in date</p>
      )}
    </div>
  )
}

export default BookingSummary