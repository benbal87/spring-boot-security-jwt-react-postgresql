package com.benbal.springbootsecurityjwt.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.benbal.springbootsecurityjwt.data.model.UserFinancialDAO;

public interface UserFinancialRepository extends JpaRepository<UserFinancialDAO, Long> {

}
