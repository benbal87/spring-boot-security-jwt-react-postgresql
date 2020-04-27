package com.benbal.springbootsecurityjwt.service.component;

import com.benbal.springbootsecurityjwt.service.model.AdminInformation;
import com.benbal.springbootsecurityjwt.service.model.LoginRequest;
import com.benbal.springbootsecurityjwt.service.model.LoginResponse;
import com.benbal.springbootsecurityjwt.service.model.RegistrationRequest;
import com.benbal.springbootsecurityjwt.service.model.UserDTO;

public interface UserService {

    LoginResponse loginUser(LoginRequest loginRequest);

    UserDTO registerUser(RegistrationRequest registrationRequest);

    UserDTO getUserDetailsById(Long userId);

    AdminInformation getAdminInformation();

}
