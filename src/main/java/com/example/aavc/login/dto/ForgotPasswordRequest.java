package com.example.aavc.login.dto;

public class ForgotPasswordRequest {
    private String username;
    private String email;

    public String getUsername(){ return username;}
    public void setUsername(String username){ this.username=username; }

    public String getEmail(){ return email;}
    public void setEmail(String email){ this.email=email; }
}
