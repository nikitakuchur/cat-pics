package com.github.nikitakuchur.catpics.repositories;

import com.github.nikitakuchur.catpics.models.Post;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PostConfig {

    @Bean("PostCommandLineRunner")
    CommandLineRunner commandLineRunner(PostRepository postRepository) {
        return args -> postRepository.saveAll(List.of(
                new Post(1L, "This cat is so cool", "OMG, look at this cool cat!", List.of("cool-cat.jpg", "cat-in-a-hat.jpg"), 13),
                new Post(2L, "Cat in a hat", "This hat suits him so well!", List.of("cat-in-a-hat.jpg"), 12)
        ));
    }
}
