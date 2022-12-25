package com.github.nikitakuchur.catpics.rest;

import com.github.nikitakuchur.catpics.dto.LoginRequest;
import com.github.nikitakuchur.catpics.dto.SignupRequest;
import com.github.nikitakuchur.catpics.dto.TokenResponse;
import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.security.UserRole;
import com.github.nikitakuchur.catpics.services.AuthService;
import com.github.nikitakuchur.catpics.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest request) {
        String accessToken = authService.authenticate(request.getUsername(), request.getPassword());
        return new TokenResponse(accessToken);
    }

    @PostMapping("/signup")
    public void signup(@RequestBody SignupRequest request) {
        // TODO: add bean validation
        if (request.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The password must contain at least 8 characters");
        }
        userService.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "This username is already taken.");
                });
        userService.save(new User(null, request.getUsername(), request.getPassword(), UserRole.USER));
    }
}
