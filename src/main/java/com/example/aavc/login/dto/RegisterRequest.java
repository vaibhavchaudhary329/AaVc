package com.example.aavc.login.dto;

public class RegisterRequest {
    private String username;
    private String password;

    //getters
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }

    //setters
    public void setUsername(String username){
        this.username=username;
    }
    public void setPassword(String password){
        this.password=password;
    }
}
