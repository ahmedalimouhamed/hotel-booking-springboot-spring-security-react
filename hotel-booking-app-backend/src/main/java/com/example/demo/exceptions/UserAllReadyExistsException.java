package com.example.demo.exceptions;

public class UserAllReadyExistsException extends RuntimeException {
    public UserAllReadyExistsException(String message) {
        super(message);
    }
}
