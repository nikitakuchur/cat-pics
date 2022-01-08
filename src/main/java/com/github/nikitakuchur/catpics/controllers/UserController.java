package com.github.nikitakuchur.catpics.controllers;

import com.github.nikitakuchur.catpics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;
    private final HttpServletRequest context;

    @Autowired
    public UserController(UserService userService, HttpServletRequest context) {
        this.userService = userService;
        this.context = context;
    }

    @GetMapping("/permissions")
    public List<String> getPermissions() {
        Principal principal = context.getUserPrincipal();
        UserDetails userDetails = userService.loadUserByUsername(principal.getName());
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }
}
