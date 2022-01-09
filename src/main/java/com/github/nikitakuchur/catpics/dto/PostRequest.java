package com.github.nikitakuchur.catpics.dto;

import java.util.Collections;
import java.util.List;

public class PostRequest {

    private String title;
    private String description;
    private List<String> images;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getImages() {
        return images != null ? images : Collections.emptyList();
    }
}
