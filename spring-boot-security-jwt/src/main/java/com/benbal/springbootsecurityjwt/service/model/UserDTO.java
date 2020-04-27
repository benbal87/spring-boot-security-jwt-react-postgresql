package com.benbal.springbootsecurityjwt.service.model;

import java.util.HashSet;
import java.util.Set;

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
public class UserDTO {

    private Long id;

    private String username;

    private String email;

    private String password;

    private Set<RoleDTO> roles = new HashSet<>();

    public UserDTO(String username, String email, String password, Set<RoleDTO> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

}
