package com.example.aavc.login.controller;

import com.example.aavc.login.dto.LoginRequest;
import com.example.aavc.login.kafka.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getidentifier();
        String password = loginRequest.getPassword();
        try{
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getidentifier(),
                            loginRequest.getPassword()
                    )
            );
            kafkaProducerService.sendUserEvent("User Logged in:" + loginRequest.getidentifier());
            return ResponseEntity.ok("Login Successful");
        }catch (BadCredentialsException badCredentialsException){
            kafkaProducerService.sendUserEvent("User unable to login:" + loginRequest.getidentifier());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("InvalidCredential");
        }
    }
}
