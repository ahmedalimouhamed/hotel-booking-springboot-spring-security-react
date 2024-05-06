package com.example.demo.services;

import com.example.demo.exceptions.InternalServerException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.Room;
import com.example.demo.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final RoomRepository repository;

    @Override
    public Room addNewRoom(
            MultipartFile file,
            String roomType,
            BigDecimal roomPrice
    ) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return repository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return repository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return repository.findAll();
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> room = repository.findById(roomId);
        if(room.isPresent()){
            repository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(
            Long roomId,
            String roomType,
            BigDecimal roomPrice,
            byte[] photoBytes
    ) {
        System.out.println("i am in update room service");
        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found")
        );
        if(roomType != null) room.setRoomType(roomType);
        if(roomPrice != null) room.setRoomPrice(roomPrice);
        if(photoBytes != null && photoBytes.length > 0){
            try{
                room.setPhoto(new SerialBlob(photoBytes));
            }catch (SQLException ex){
                throw new InternalServerException("Error updating room");
            }
        }
        return repository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(repository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return repository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long id) throws SQLException {
        Optional<Room> theRoom = repository.findById(id);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, room not found");
        }

        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            System.out.println("photoblob");
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }

        return null;
    }
}
