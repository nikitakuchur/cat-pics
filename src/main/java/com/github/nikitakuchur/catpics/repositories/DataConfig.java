package com.github.nikitakuchur.catpics.repositories;

import com.github.nikitakuchur.catpics.models.Post;
import com.github.nikitakuchur.catpics.models.User;
import com.github.nikitakuchur.catpics.security.UserRole;
import com.github.nikitakuchur.catpics.services.PostService;
import com.github.nikitakuchur.catpics.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
public class DataConfig {

    @Bean
    @Profile("local")
    public CommandLineRunner commandLineRunner(PostService postService, UserService userService) {
        return args -> {
            userService.saveAll(List.of(
                    new User(1L, "admin", "admin", UserRole.ADMIN),
                    new User(2L, "test", "test", UserRole.USER)
            ));
            postService.saveAll(List.of(
                    new Post(1L, userService.loadUserByUsername("admin"), "This cat is so cool", "OMG, look at this cool cat!", List.of("cool-cat.jpg"), 13),
                    new Post(2L, userService.loadUserByUsername("admin"), "Cat in a hat", "This hat suits him so well!", List.of("cat-in-a-hat.jpg"), 12)
            ));
        };
    }
}
