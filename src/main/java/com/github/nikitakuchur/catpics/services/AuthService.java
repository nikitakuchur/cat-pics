package com.github.nikitakuchur.catpics.services;

import com.github.nikitakuchur.catpics.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;

    @Value("${application.jwt.secret-key}")
    private String secretKey;
    @Value("${application.jwt.access-token.lifetime}")
    private long accessTokenLifetime;

    public String authenticate(String username, String password) {
        User user;
        try {
            Authentication aut = authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            user = (User) aut.getPrincipal();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }

        // TODO: we should generate refresh token as well
        return createAccessToken(user);
    }

    private String createAccessToken(User user) {
        Date createdAt = new Date();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("authorities", user.getAuthorities())
                .setIssuedAt(createdAt)
                .setNotBefore(createdAt)
                .setExpiration(new Date(createdAt.getTime() + Duration.ofMinutes(accessTokenLifetime).toMillis()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }
}
