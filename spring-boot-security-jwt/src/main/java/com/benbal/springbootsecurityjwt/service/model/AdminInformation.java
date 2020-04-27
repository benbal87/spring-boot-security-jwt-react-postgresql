package com.benbal.springbootsecurityjwt.service.model;

import java.util.ArrayList;
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
public class AdminInformation {

    Long numberOfUsers;

    List<UserStatisticsDTO> userStatisticsList = new ArrayList<>();

}
