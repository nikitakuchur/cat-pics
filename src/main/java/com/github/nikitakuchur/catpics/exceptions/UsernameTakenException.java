package com.github.nikitakuchur.catpics.exceptions;

public class UsernameTakenException extends RuntimeException {
    public UsernameTakenException(String message) {
        super(message);
    }
}
