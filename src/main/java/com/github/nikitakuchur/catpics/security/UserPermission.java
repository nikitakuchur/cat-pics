package com.github.nikitakuchur.catpics.security;

public enum UserPermission {
    POST_READ("post:read"),
    POST_CREATE("post:create"),
    POST_COMMENT("post:comment"),
    POST_EDIT("post:edit");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
