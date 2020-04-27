package com.benbal.springbootsecurityjwt.web.security.component;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.benbal.springbootsecurityjwt.web.security.service.UserDetailsServiceImpl;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class AuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        try {
            String jwtToken = parseJwtToken(request);

            boolean isTokenValid = jwtToken != null && jwtUtils.validateJwtToken(jwtToken);
            if (isTokenValid) {
                String username = jwtUtils.getUserNameFromJwtToken(jwtToken);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception exception) {
            log.error("Cannot set user authentication: {}", exception.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwtToken(HttpServletRequest request) {
        String result = null;

        String authorizationHeaderValue = request.getHeader("Authorization");
        boolean isJwtTokenExists =
            StringUtils.hasText(authorizationHeaderValue) && authorizationHeaderValue.startsWith("Bearer ");
        if (isJwtTokenExists) {
            result = authorizationHeaderValue.substring(7);
        }

        return result;
    }

}
