package com.benbal.springbootsecurityjwt.service.model;

import com.benbal.springbootsecurityjwt.data.model.Role;

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
public class RoleDTO {

    private Integer id;

    private Role name;

    public RoleDTO(Role name) {
        this.name = name;
    }

}
