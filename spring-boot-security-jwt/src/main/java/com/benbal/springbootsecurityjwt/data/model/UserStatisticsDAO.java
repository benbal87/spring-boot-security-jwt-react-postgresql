package com.benbal.springbootsecurityjwt.data.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_statistics")
public class UserStatisticsDAO implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate statDate;

    private Integer numberOfLoginsPerDay;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "id"
    )
    private UserDAO userDAO;

    public UserStatisticsDAO(LocalDate statDate, Integer numberOfLoginsPerDay, UserDAO userDAO) {
        this.statDate = statDate;
        this.numberOfLoginsPerDay = numberOfLoginsPerDay;
        this.userDAO = userDAO;
    }

}
