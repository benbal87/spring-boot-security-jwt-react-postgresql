package com.benbal.springbootsecurityjwt.web.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.benbal.springbootsecurityjwt.data.model.UserDAO;
import com.benbal.springbootsecurityjwt.data.repository.UserRepository;
import com.benbal.springbootsecurityjwt.service.model.UserDTO;
import com.benbal.springbootsecurityjwt.util.ModelConverterUtil;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelConverterUtil modelConverterUtil;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDAO userDAO = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        UserDTO userDTO = modelConverterUtil.getUserDTO(userDAO);

        return UserDetailsImpl.build(userDTO);
    }

}
