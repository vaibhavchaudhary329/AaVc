package com.example.aavc.login.service;

import com.example.aavc.login.config.CustomOAuth2User;
import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // If email not found, abort login
        if (email == null || name == null) {
            throw new OAuth2AuthenticationException("Email or Name not present in OAuth2 response");
        }

        // Check for existing user
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setUsername(generateUniqueUsername(name)); // e.g., name converted to lowercase
            user.setLoginProvider("GOOGLE");
            userRepository.save(user);
        }

        return new CustomOAuth2User(oAuth2User);
    }

    private String generateUniqueUsername(String baseName) {
        String username = baseName.trim().toLowerCase().replaceAll(" ", "_");
        String temp = username;
        int count = 1;

        while (userRepository.existsByUsername(temp)) {
            temp = username + count;
            count++;
        }
        return temp;
    }
}
