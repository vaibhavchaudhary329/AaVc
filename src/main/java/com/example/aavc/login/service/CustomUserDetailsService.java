package com.example.aavc.login.service;

import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import com.example.aavc.login.controller.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Optional<User> userOpt;

        if (identifier.contains("@")) {
            userOpt = userRepository.findByEmail(identifier.toLowerCase());
        } else if(isTenDigitNumber(identifier)){
            userOpt = userRepository.findByMobile(identifier);
        } else{
            userOpt = userRepository.findByUsername(identifier);
        }

        User user = userOpt.orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email: " + identifier)
        );

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), // or user.getEmail() — depends on your auth policy
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );

    }
    // Helper method to check if a string is a 10-digit number
    private boolean isTenDigitNumber(String s) {
        if (s == null || s.length() != 10) {
            return false;
        }
        // Check if all characters are digits
        for (char c : s.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }
}
