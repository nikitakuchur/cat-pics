package com.github.nikitakuchur.catpics.services;

import com.github.nikitakuchur.catpics.exceptions.UsernameTakenException;
import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.repositories.UserRepository;
import com.github.nikitakuchur.catpics.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
    }

    public void save(User user) {
        userRepository.findByUsername(user.getUsername())
                .ifPresent(u -> {
                    throw new UsernameTakenException("User with name '" + user.getUsername() + "' already exists");
                });
        User userToSave = new User(null, user.getUsername(), passwordEncoder.encode(user.getPassword()), UserRole.USER);
        userRepository.save(userToSave);
    }

    public void saveAll(Collection<User> users) {
        List<User> usersToSave = new ArrayList<>();
        for (User user : users) {
            userRepository.findByUsername(user.getUsername())
                    .ifPresent(u -> {
                        throw new UsernameTakenException("User with name '" + user.getUsername() + "' already exists");
                    });
            usersToSave.add(new User(null, user.getUsername(), passwordEncoder.encode(user.getPassword()), UserRole.USER));
        }
        userRepository.saveAll(usersToSave);
    }
}
