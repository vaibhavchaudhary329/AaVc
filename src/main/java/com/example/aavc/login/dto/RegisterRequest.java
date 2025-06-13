package com.example.aavc.login.dto;

public class RegisterRequest {
    private String mobile;
    private String fullName;
    private String email;
    private String username;
    private String password;
    private String confirmPassword;

    //getter
    public String getMobile(){ return mobile;}
    public String getFullName(){ return fullName;}
    public String getEmail(){ return email;}
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }
    public String getConfirmPassword(){
        return confirmPassword;
    }

    //setter
    public void setMobile(String mobile){ this.mobile=mobile; }
    public void setFullName(String fullName){ this.fullName=fullName; }
    public void setEmail(String email){ this.email=email; }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
