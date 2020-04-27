package com.benbal.springbootsecurityjwt.service.component;

import java.util.Set;

import com.benbal.springbootsecurityjwt.data.model.RoleDAO;

public interface RoleService {

    Set<RoleDAO> getRoleDAOs(Set<String> stringRoles);

}
