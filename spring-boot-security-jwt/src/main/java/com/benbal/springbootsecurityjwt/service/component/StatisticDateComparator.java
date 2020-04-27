package com.benbal.springbootsecurityjwt.service.component;

import java.io.File;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.Date;

import com.benbal.springbootsecurityjwt.service.model.UserStatisticsDTO;

public class StatisticDateComparator implements Comparator<UserStatisticsDTO> {

    @Override
    public int compare(UserStatisticsDTO o1, UserStatisticsDTO o2) {
        LocalDate date1 = o1.getStatDate();
        LocalDate date2 = o2.getStatDate();

        if (date1.isBefore(date2)) {
            return -1;
        } else if (date1.isAfter(date2)) {
            return 1;
        }

        return 0;
    }

}
