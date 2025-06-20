package com.example.aavc.login.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="login_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String role;
    @Column(name = "reset_token")
    private String resetToken;
    @Column(name="token_expiry")
    private LocalDateTime tokenExpiry;

    //Getter
    public String getEmail(){ return email;}
    public String getUsername(){ return username;}
    public String getPassword(){return password;}
    public String getRole(){ return role;}
    public String getResetToken(){ return resetToken;}
    public LocalDateTime getTokenExpiry(){ return tokenExpiry;}

    //Setter
    public void setEmail(String email){this.email=email;}
    public void setUsername(String username){this.username=username;}
    public void setPassword(String password){this.password=password;}
    public void setRole(String role){this.role=role;}
    public void setResetToken(String resetToken) { this.resetToken=resetToken;}
    public void setTokenExpiry(LocalDateTime tokenExpiry) { this.tokenExpiry=tokenExpiry;}
}
