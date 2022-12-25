package com.github.nikitakuchur.catpics.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostRequest {

    private String title;
    private String description;
    private List<String> images;
}
