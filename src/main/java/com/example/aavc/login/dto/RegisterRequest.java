package com.example.aavc.login.dto;

public class RegisterRequest {
    private String email;
    private String username;
    private String password;

    //getter
    public String getEmail(){ return email;}
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }

    //setter
    public void setEmail(String email){ this.email=email; }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
