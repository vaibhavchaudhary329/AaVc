package com.example.aavc.login.entity;

import jakarta.persistence.*;

@Entity
@Table(name="login_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    private String password;

    private String role;

    //Getter
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }
    public String getRole(){
        return role;
    }

    //Setter
    public void setUsername(String username){
        this.username=username;
    }
    public void setPassword(String password){
        this.password=password;
    }

    public void setRole(String role){
        this.role=role;
    }
}
