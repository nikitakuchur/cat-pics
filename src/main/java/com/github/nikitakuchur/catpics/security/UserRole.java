package com.github.nikitakuchur.catpics.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.github.nikitakuchur.catpics.security.UserPermission.*;

public enum UserRole {
    ADMIN(POST_READ, POST_CREATE),
    USER(POST_READ);

    private final Set<UserPermission> permissions;

    UserRole(UserPermission... permissions) {
        this.permissions = Set.of(permissions);
    }

    public boolean hasPermission(UserPermission permission) {
        return permissions.contains(permission);
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> result = permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        result.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return result;
    }
}
