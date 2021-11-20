package com.github.nikitakuchur.catpics.controllers;

import com.github.nikitakuchur.catpics.models.Post;
import com.github.nikitakuchur.catpics.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAll() {
        return postService.getAll();
    }

    @GetMapping("/{id}")
    public Post get(@PathVariable Long id) {
        return postService.get(id);
    }

    // TODO: replace the parameter with dto
    @PostMapping
    public void save(@RequestBody Post post) {
        postService.save(post);
    }
}
