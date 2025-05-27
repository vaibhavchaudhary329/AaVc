package com.example.aavc.login.controller;

import com.example.aavc.login.dto.ForgotPasswordRequest;
import com.example.aavc.login.dto.ResetPasswordRequest;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import com.example.aavc.login.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request){
        Optional<User> userOpt= userRepository.findByEmail(request.getEmail().toLowerCase());
        if(userOpt.isEmpty()){
            return ResponseEntity.badRequest().body("User not found");
        }

        User user=userOpt.get();
        String token= UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15)); //Token Valid for 15 mins
        userRepository.save(user);

        emailService.sendResetLink(user.getEmail(), token);
        return ResponseEntity.ok("Reset link sent to your email.");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetpassword(@RequestBody ResetPasswordRequest request){
        Optional<User> userOpt= userRepository.findByResetToken(request.getToken());
        if(userOpt.isEmpty()){
            return ResponseEntity.badRequest().body("Invalid token");
        }

        User user=userOpt.get();
        if(user.getTokenExpiry().isBefore(LocalDateTime.now())){
            return ResponseEntity.badRequest().body("Token expired");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setTokenExpiry(null);
        userRepository.save(user);
        return ResponseEntity.ok("Password Reset successfully");
    }
}
