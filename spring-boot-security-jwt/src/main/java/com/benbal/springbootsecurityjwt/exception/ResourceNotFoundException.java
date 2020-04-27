package com.benbal.springbootsecurityjwt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ResponseStatus(
    value = HttpStatus.NOT_FOUND,
    reason = "Resource not found!"
)
public class ResourceNotFoundException extends RuntimeException {

    private String message;

    private Throwable exception;

    public ResourceNotFoundException() {
        super();
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }

}
