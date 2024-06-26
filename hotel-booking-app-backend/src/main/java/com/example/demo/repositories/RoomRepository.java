package com.example.demo.repositories;

import com.example.demo.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository  extends JpaRepository<Room, Long> {

    @Query("select distinct r.roomType from Room r")
    List<String> findDistinctRoomTypes();

    @Query("""
                select r from Room r 
                where r.roomType like %:roomType%
                and r.id not in(
                    select br.room.id from BookedRoom br
                    where ((br.checkInDate < :checkInDate) and (br.checkOutDate > :checkOutDate))
                )
            """)
    List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
