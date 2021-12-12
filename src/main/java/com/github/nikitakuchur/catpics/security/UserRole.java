package com.github.nikitakuchur.catpics.security;

import java.util.Set;

import static com.github.nikitakuchur.catpics.security.UserPermission.*;

public enum UserRole {
    ADMIN(POST_READ),
    USER(POST_READ);

    private final Set<UserPermission> permissions;

    UserRole(UserPermission... permissions) {
        this.permissions = Set.of(permissions);
    }

    boolean hasPermission(UserPermission permission) {
        return permissions.contains(permission);
    }
}
