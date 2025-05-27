package com.example.aavc.login.dto;

public class LoginRequest {
    private String identifier;  // could be username or email
    private String password;

    // Constructors (optional)
    public LoginRequest() {}

    public LoginRequest(String identifier, String password) {
        this.identifier = identifier;
        this.password = password;
    }

    // Getters & Setters
    public String getidentifier() {
        return identifier;
    }

    public void setidentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
