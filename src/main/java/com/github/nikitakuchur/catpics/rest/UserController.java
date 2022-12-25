package com.github.nikitakuchur.catpics.rest;

import com.github.nikitakuchur.catpics.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {

    private final UserService userService;
    private final HttpServletRequest context;

    @GetMapping("/permissions")
    public List<String> getPermissions() {
        Principal principal = context.getUserPrincipal();
        UserDetails userDetails = userService.loadUserByUsername(principal.getName());
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }
}
