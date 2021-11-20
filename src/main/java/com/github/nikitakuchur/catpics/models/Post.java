package com.github.nikitakuchur.catpics.models;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Table
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    @ElementCollection
    private List<String> images;
    @Column(columnDefinition = "integer default 0")
    private Integer likes = 0;

    protected Post() {
    }

    public Post(Long id, String title, String description, List<String> images, Integer likes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.images = Collections.unmodifiableList(images);
        this.likes = likes;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getImages() {
        return images;
    }

    public Integer getLikes() {
        return likes;
    }
}
