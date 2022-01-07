package com.github.nikitakuchur.catpics.controllers;

import com.github.nikitakuchur.catpics.dto.SignupRequest;
import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.security.UserRole;
import com.github.nikitakuchur.catpics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/signup")
public class SignupController {

    private final UserService userService;

    @Autowired
    public SignupController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("permitAll()")
    public void signup(@RequestBody SignupRequest request) {
        if (request.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The password must contain at least 8 characters");
        }
        UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        if (userDetails != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This username is already taken.");
        }
        userService.saveUser(new User(null, request.getUsername(), request.getPassword(), UserRole.USER));
    }
}
