package com.github.nikitakuchur.catpics.security;

public enum UserPermission {
    POST_READ("post:read"), // Read posts
    POST_CREATE("post:create"), // Create posts
    POST_EDIT("post:edit"), // Edit any post
    POST_DELETE("post:delete"); // Delete any post

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
