package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id")
    private Long bookingId;

    @Column(name="check_in")
    private LocalDate checkInDate;

    @Column(name="check_out")
    private LocalDate checkOutDate;

    @Column(name="guest_fullname")
    private String guestFullName;

    @Column(name="guest_email")
    private String guestEmail;

    @Column(name="adults")
    private int numOfAdults;

    @Column(name="children")
    private int numOfChildren;

    @Column(name="total_guest")
    private int totalNumOfGuest;

    @Column(name="confirmation_code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public void caldulateTotalOfNumberOfGuest(){
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        this.caldulateTotalOfNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        this.caldulateTotalOfNumberOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
