package com.example.aavc.login.controller;

import com.example.aavc.login.dto.LoginRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import com.example.aavc.login.service.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "${FRONTEND_CORS}")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getidentifier();
        String password = loginRequest.getPassword();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, password)
            );

            // 🔍 Find user by username, mobile, or email
            Optional<User> optionalUser = findUserByAnyIdentifier(identifier);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            User user = optionalUser.get();
            String token = jwtService.generateToken(user);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "name", user.getFullName(),
                    "email", user.getEmail(),
                    "mobile", user.getMobile()
            ));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("/oauth2-success")
    public void oauthSuccess(HttpServletResponse response, OAuth2AuthenticationToken authentication) throws IOException {
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Save new user if not already in DB
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(name);
            return userRepository.save(newUser);
        });

        String token = jwtService.generateToken(user);
        response.sendRedirect("http://localhost:3000/oauth2-redirect?token=" + token);
    }

    // ♻️ Shared identifier lookup logic
    private Optional<User> findUserByAnyIdentifier(String identifier) {
        if (identifier.contains("@")) {
            return userRepository.findByEmail(identifier.toLowerCase());
        } else if (identifier.length() == 10 && identifier.matches("\\d+")) {
            return userRepository.findByMobile(identifier);
        } else {
            return userRepository.findByUsername(identifier);
        }
    }
}
