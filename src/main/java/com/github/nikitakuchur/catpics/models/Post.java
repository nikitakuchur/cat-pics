package com.github.nikitakuchur.catpics.models;

import jakarta.persistence.*;

import java.util.Collections;
import java.util.List;

@Entity
@Table
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private String title;
    private String description;

    @ElementCollection
    private List<String> images;

    @Column(columnDefinition = "integer default 0")
    private Integer likes = 0;

    protected Post() {
    }

    public Post(Long id, User author, String title, String description, List<String> images, Integer likes) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.description = description;
        this.images = Collections.unmodifiableList(images);
        this.likes = likes;
    }

    public Long getId() {
        return id;
    }

    public User getAuthor() {
        return author;
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
