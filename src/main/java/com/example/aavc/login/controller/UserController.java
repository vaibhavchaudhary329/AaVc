package com.example.aavc.login.controller;

import com.example.aavc.login.dto.RegisterRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/home")
    public String home() {
        return "Welcome User!";
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()
                || userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Username or Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
