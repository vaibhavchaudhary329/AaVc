package com.example.aavc.login.service;

import com.example.aavc.login.entity.User;
import com.example.aavc.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(userRequest);

        String email = oauthUser.getAttribute("email");
        String username = oauthUser.getAttribute("name"); // You may use a different attribute

        boolean userExistsByEmail = userRepository.existsByEmail(email);
        boolean userExistsByUsername = userRepository.existsByUsername(username);

        if (!userExistsByEmail && !userExistsByUsername) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setFullName(oauthUser.getAttribute("name"));
            newUser.setLoginProvider("GOOGLE");

            userRepository.save(newUser);
        }

        return oauthUser;
    }
}
