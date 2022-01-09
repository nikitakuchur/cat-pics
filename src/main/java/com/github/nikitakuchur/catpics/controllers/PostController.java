package com.github.nikitakuchur.catpics.controllers;

import com.github.nikitakuchur.catpics.dto.PostRequest;
import com.github.nikitakuchur.catpics.models.Post;
import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.services.PostService;
import com.github.nikitakuchur.catpics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('post:read')")
    public List<Post> getAll() {
        return postService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('post:read')")
    public Post get(@PathVariable Long id) {
        return postService.get(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('post:create')")
    public void save(@RequestBody PostRequest post, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        User user = userService.loadUserByUsername(principal.getName());
        postService.save(new Post(null, user, post.getTitle(), post.getDescription(), post.getImages(), 0));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        User user = userService.loadUserByUsername(principal.getName());
        if (user.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("post:delete"))) {
            postService.delete(id);
            return;
        }

        Post post = postService.get(id);
        if (post.getAuthor().getUsername().equals(principal.getName())) {
            postService.delete(id);
            return;
        }

        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The user doesn't have such a permission.");
    }
}
