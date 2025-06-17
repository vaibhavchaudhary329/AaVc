package com.example.aavc.login.controller;

import com.example.aavc.login.dto.RegisterRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "${FRONTEND_CORS}")
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
    public String home() {return "Welcome User!";}

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()
                || userRepository.findByEmail(request.getEmail()).isPresent() ||
                userRepository.findByMobile(request.getMobile()).isPresent()) {
            return ResponseEntity.badRequest().body("Username or Email or mobile already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    // GET /users/{id}
    @GetMapping("/{identifier}")
    public ResponseEntity<User> getUser(@PathVariable String identifier) {
        return findUserByAnyIdentifier(identifier)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /users/{id}
    @PutMapping("/{identifier}")
    public ResponseEntity<String> updateUser(
            @PathVariable String identifier,
            @RequestBody User updatedUser) {

        return findUserByAnyIdentifier(identifier).map(user -> {
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            user.setMobile(updatedUser.getMobile());
            userRepository.save(user);
            return ResponseEntity.ok("User updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
    private Optional<User> findUserByAnyIdentifier(String identifier) {
        if (identifier == null || identifier.trim().isEmpty()) {
            return Optional.empty();
        }

        // 1. Check if it's an email
        if (identifier.contains("@")) {
            return userRepository.findByEmail(identifier.toLowerCase());
        }

        // 2. Check if it's a valid mobile number
        if (isTenDigitNumber(identifier)) {
            return userRepository.findByMobile(identifier);
        }

        // 3. Otherwise, treat it as a username
        return userRepository.findByUsername(identifier);
    }
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
