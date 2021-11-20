package com.github.nikitakuchur.catpics.repositories;

import com.github.nikitakuchur.catpics.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
