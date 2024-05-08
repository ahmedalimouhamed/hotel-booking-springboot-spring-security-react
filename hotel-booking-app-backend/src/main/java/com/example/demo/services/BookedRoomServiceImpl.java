package com.example.demo.services;

import com.example.demo.exceptions.InvalidBookingrequestException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.BookedRoom;
import com.example.demo.models.Room;
import com.example.demo.repositories.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoomService {

    private final BookedRoomRepository repository;
    private final IRoomService roomService;

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate()) && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate()) && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate()) && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                        || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate()) && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return repository.findAll();
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return repository.findByRoomId(id);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingrequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            repository.save(bookingRequest);
        }else{
            throw new InvalidBookingrequestException("Sorry, this room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }



    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return repository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(()-> new ResourceNotFoundException("No booking found with booking code: "+confirmationCode));
    }

    @Override
    public void cancelBooking(Long bookingId) {
        repository.deleteById(bookingId);
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return repository.findByGuestEmail(email);
    }
}
