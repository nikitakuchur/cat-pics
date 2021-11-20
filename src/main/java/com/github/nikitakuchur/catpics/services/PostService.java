package com.github.nikitakuchur.catpics.services;

import com.github.nikitakuchur.catpics.models.Post;
import com.github.nikitakuchur.catpics.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAll() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Post get(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public void save(Post post) {
        postRepository.save(post);
    }
}
