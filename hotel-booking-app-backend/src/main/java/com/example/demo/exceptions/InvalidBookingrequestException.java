package com.example.demo.exceptions;

public class InvalidBookingrequestException extends RuntimeException {
    public InvalidBookingrequestException(String message){
        super(message);
    }
}
