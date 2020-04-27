package com.benbal.springbootsecurityjwt.web.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benbal.springbootsecurityjwt.service.component.UserService;
import com.benbal.springbootsecurityjwt.service.model.LoginRequest;
import com.benbal.springbootsecurityjwt.service.model.LoginResponse;
import com.benbal.springbootsecurityjwt.service.model.RegistrationRequest;
import com.benbal.springbootsecurityjwt.service.model.UserDTO;

import lombok.extern.log4j.Log4j2;

@Log4j2
@CrossOrigin(
    origins = "*",
    maxAge = 3600
)
@RestController
@RequestMapping("/springbootapi/auth")
public class AuthenticationController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("Incoming login: {}", loginRequest.toString());
        LoginResponse loginResponse = userService.loginUser(loginRequest);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(loginResponse);
    }

    @PostMapping("/registration")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        log.info("Incoming user registration: {}", registrationRequest.toString());
        UserDTO savedUser = userService.registerUser(registrationRequest);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(savedUser);
    }

}
