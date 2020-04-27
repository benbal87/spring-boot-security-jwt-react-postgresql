package com.benbal.springbootsecurityjwt.service.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String type = "Bearer";

    private String jwtToken;

    private List<String> roles;

    public LoginResponse(Long id, String jwtToken, List<String> roles) {
        this.id = id;
        this.jwtToken = jwtToken;
        this.roles = roles;
    }

}
