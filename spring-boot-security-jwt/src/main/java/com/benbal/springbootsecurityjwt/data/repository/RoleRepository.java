package com.benbal.springbootsecurityjwt.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.benbal.springbootsecurityjwt.data.model.Role;
import com.benbal.springbootsecurityjwt.data.model.RoleDAO;

@Repository
public interface RoleRepository extends JpaRepository<RoleDAO, Long> {

    Optional<RoleDAO> findByName(Role name);

}
