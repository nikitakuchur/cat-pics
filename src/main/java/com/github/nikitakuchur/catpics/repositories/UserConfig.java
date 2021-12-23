package com.github.nikitakuchur.catpics.repositories;

import com.github.nikitakuchur.catpics.models.AppUser;
import com.github.nikitakuchur.catpics.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean("UserCommandLineRunner")
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> userRepository.saveAll(List.of(
                new AppUser(1L, "admin", passwordEncoder.encode("admin"), UserRole.ADMIN),
                new AppUser(2L, "test", passwordEncoder.encode("test"), UserRole.USER)
        ));
    }
}
