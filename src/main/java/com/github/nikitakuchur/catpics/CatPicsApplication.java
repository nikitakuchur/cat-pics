package com.github.nikitakuchur.catpics;

import com.github.nikitakuchur.catpics.security.JwtConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtConfig.class)
public class CatPicsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatPicsApplication.class, args);
	}
}
