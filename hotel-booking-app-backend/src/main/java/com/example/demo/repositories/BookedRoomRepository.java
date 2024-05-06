package com.example.demo.repositories;

import com.example.demo.models.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(Long id);

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);
}
