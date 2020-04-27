package com.benbal.springbootsecurityjwt.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.benbal.springbootsecurityjwt.data.model.UserDAO;

@Repository
public interface UserRepository extends JpaRepository<UserDAO, Long> {

    Optional<UserDAO> findByUsername(String username);

    Optional<UserDAO> getById(Long userId);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Long countAllByUsernameNotNull();

}
