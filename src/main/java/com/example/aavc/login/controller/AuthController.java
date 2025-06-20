package com.example.aavc.login.controller;

import com.example.aavc.login.dto.LoginRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import com.example.aavc.login.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        String username = loginRequest.getidentifier();
        String password = loginRequest.getPassword();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getidentifier(),
                            loginRequest.getPassword()
                    )
            );
            return ResponseEntity.ok("Login Successful");
        } catch (BadCredentialsException badCredentialsException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("InvalidCredential");
        }
    }

    /*@GetMapping("/google/success")
    public ResponseEntity<?> success(OAuth2AuthenticationToken authentication) {
        Map<String, Object> details = authentication.getPrincipal().getAttributes();

        String email = (String) details.get("email");
        String name = (String) details.get("name");

        // Find or create user in DB
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(name);
            return userRepository.save(newUser);
        });

        // Issue JWT (reuse your existing jwtService)
        String token = jwtService.generateToken(user);

        // Return token to frontend (or redirect)
        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", user.getEmail(),
                "phone", user.getMobile(),
                "name", user.getFullName()

        ));
    }*/

}
