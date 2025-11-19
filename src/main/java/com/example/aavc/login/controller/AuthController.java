package com.example.aavc.login.controller;

import com.example.aavc.login.dto.LoginRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import com.example.aavc.login.service.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "${APP_CORS_ALLOWED_ORIGIN}")
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
                    new UsernamePasswordAuthenticationToken(identifier, password));

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
                    "mobile", user.getMobile()));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/oauth2-success")
    public void oauthSuccess(HttpServletResponse response, OAuth2AuthenticationToken authentication)
            throws IOException {
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        String fullname = (String) attributes.get("name");
        System.out.println("Email: " + email + attributes);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            response.sendRedirect("https://aavc.netify.app/oauth2-redirect?&email=" + email + "&fullname=" + fullname);

            return;
        }

        User user = userOpt.get();
        String token = jwtService.generateToken(user);

        response.sendRedirect(
                "https://aavc.netify.app/oauth2-redirect?token=" + token + "&email=" + email + "&fullname=" + fullname);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(user);
    }

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
