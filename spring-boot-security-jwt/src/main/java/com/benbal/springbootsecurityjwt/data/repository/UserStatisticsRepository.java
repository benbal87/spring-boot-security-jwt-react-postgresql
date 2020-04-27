package com.benbal.springbootsecurityjwt.data.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.benbal.springbootsecurityjwt.data.model.UserDAO;
import com.benbal.springbootsecurityjwt.data.model.UserStatisticsDAO;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatisticsDAO, Long> {

    Optional<UserStatisticsDAO> findByUserDAOAndStatDateEquals(UserDAO userDao, LocalDate statDate);

    List<UserStatisticsDAO> findAllByOrderByStatDateAsc();

}
