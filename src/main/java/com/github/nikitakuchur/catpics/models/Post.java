package com.github.nikitakuchur.catpics.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
