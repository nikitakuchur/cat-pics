package com.github.nikitakuchur.catpics.services;

import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.repositories.UserRepository;
import com.github.nikitakuchur.catpics.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }

    public void saveUser(User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null) {
            throw new IllegalArgumentException("User with name '" + user.getUsername() + "' already exists");
        }
        User userToSave = new User(null, user.getUsername(), passwordEncoder.encode(user.getPassword()), UserRole.USER);
        userRepository.save(userToSave);
    }
}
