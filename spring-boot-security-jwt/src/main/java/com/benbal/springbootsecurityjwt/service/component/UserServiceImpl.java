package com.benbal.springbootsecurityjwt.service.component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.benbal.springbootsecurityjwt.data.model.Role;
import com.benbal.springbootsecurityjwt.data.model.RoleDAO;
import com.benbal.springbootsecurityjwt.data.model.UserDAO;
import com.benbal.springbootsecurityjwt.data.model.UserStatisticsDAO;
import com.benbal.springbootsecurityjwt.data.repository.UserRepository;
import com.benbal.springbootsecurityjwt.data.repository.UserStatisticsRepository;
import com.benbal.springbootsecurityjwt.exception.RegistrationException;
import com.benbal.springbootsecurityjwt.exception.ResourceNotFoundException;
import com.benbal.springbootsecurityjwt.service.model.AdminInformation;
import com.benbal.springbootsecurityjwt.service.model.LoginRequest;
import com.benbal.springbootsecurityjwt.service.model.LoginResponse;
import com.benbal.springbootsecurityjwt.service.model.RegistrationRequest;
import com.benbal.springbootsecurityjwt.service.model.UserDTO;
import com.benbal.springbootsecurityjwt.service.model.UserStatisticsDTO;
import com.benbal.springbootsecurityjwt.util.ModelConverterUtil;
import com.benbal.springbootsecurityjwt.web.security.component.JwtTokenUtil;
import com.benbal.springbootsecurityjwt.web.security.service.UserDetailsImpl;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    RoleService roleService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStatisticsRepository userStatisticsRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ModelConverterUtil modelConverterUtil;

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtTokenUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

        saveLoginToStatistic(loginRequest);

        return new LoginResponse(
            userDetails.getId(),
            jwtToken,
            roles
        );
    }

    @Override
    public UserDTO registerUser(RegistrationRequest registrationRequest) {
        if (registrationRequest.getRoles().contains(Role.ROLE_ADMIN.toString())) {
            throw new RegistrationException("Admin can not be registered this way!");
        }

        if (userRepository.existsByUsername(registrationRequest.getUsername())) {
            throw new RegistrationException("This username is already exists!");
        }

        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new RegistrationException("Error: Email is already in use!");
        }

        String encodedPassword = encoder.encode(registrationRequest.getPassword());
        Set<RoleDAO> roleDAOs = roleService.getRoleDAOs(registrationRequest.getRoles());

        UserDAO userDAO = new UserDAO(
            registrationRequest.getUsername(),
            registrationRequest.getEmail(),
            encodedPassword,
            roleDAOs
        );

        UserDAO savedUser = userRepository.save(userDAO);

        return modelConverterUtil.getUserDTO(savedUser);
    }

    @Override
    public UserDTO getUserDetailsById(Long userId) {
        UserDAO userDAO = userRepository.getById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return modelConverterUtil.getUserDTO(userDAO);
    }

    @Override
    public AdminInformation getAdminInformation() {
        log.info("Count number of users");
        Long numberOfUsers = userRepository.countAllByUsernameNotNull();

        List<UserStatisticsDAO> allByOrderByStatDateAsc = userStatisticsRepository.findAllByOrderByStatDateAsc();
        log.info("allByOrderByStatDateAsc: {}", allByOrderByStatDateAsc);

        List<UserStatisticsDTO> userStatisticsDTOList = getUserStatisticsDTOList(allByOrderByStatDateAsc);

        return new AdminInformation(
            numberOfUsers,
            userStatisticsDTOList
        );
    }

    private void saveLoginToStatistic(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        UserDAO userDAO = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found by username: " + username));

        Optional<UserStatisticsDAO> optionalStatistics =
            userStatisticsRepository.findByUserDAOAndStatDateEquals(userDAO, LocalDate.now());

        if (optionalStatistics.isPresent()) {
            var userStatisticsDAO = optionalStatistics.get();
            userStatisticsDAO.setNumberOfLoginsPerDay(userStatisticsDAO.getNumberOfLoginsPerDay() + 1);
            UserStatisticsDAO update = userStatisticsRepository.save(userStatisticsDAO);
            log.info("User statistics updated for user: {}", update.getUserDAO().getUsername());
        } else {
            var userStatisticsDAO = new UserStatisticsDAO(
                LocalDate.now(),
                1,
                userDAO
            );
            log.info("userStatisticsDAO: {}", userStatisticsDAO.toString());
            UserStatisticsDAO save = userStatisticsRepository.save(userStatisticsDAO);
            log.info("User statistics saved for user: {}", save.getUserDAO().getUsername());
        }
    }

    private List<UserStatisticsDTO> getUserStatisticsDTOList(List<UserStatisticsDAO> allByOrderByStatDateAsc) {
        Set<LocalDate> statDateSet = allByOrderByStatDateAsc.stream()
            .map(UserStatisticsDAO::getStatDate)
            .collect(Collectors.toSet());

        List<UserStatisticsDTO> userStatisticsDTOList = new ArrayList<>();
        for (LocalDate localDate : statDateSet) {
            var userStatisticsDTO = new UserStatisticsDTO();
            userStatisticsDTO.setStatDate(localDate);
            userStatisticsDTO.setNumberOfLogins(0L);

            for (UserStatisticsDAO userStatisticsDAO : allByOrderByStatDateAsc) {
                if (userStatisticsDAO.getStatDate().equals(localDate)) {
                    long incrementedValue =
                        userStatisticsDTO.getNumberOfLogins() + userStatisticsDAO.getNumberOfLoginsPerDay();
                    userStatisticsDTO.setNumberOfLogins(incrementedValue);
                }
            }

            userStatisticsDTOList.add(userStatisticsDTO);
        }

        return userStatisticsDTOList;
    }

}
