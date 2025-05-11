package com.example.aavc.login.controller;

import com.example.aavc.login.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    @GetMapping("/home")
    public String home(){
        return "Welcome User!";
    }


}
