package com.github.nikitakuchur.catpics.controllers;

import com.github.nikitakuchur.catpics.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/images")
public class ImageController {

    private final FileService fileService;

    @Autowired
    public ImageController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value = "/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    @PreAuthorize("permitAll()")
    public byte[] get(@PathVariable String name) throws IOException {
        var file = fileService.load(name);
        return file.getInputStream().readAllBytes();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('post:create')")
    public List<String> upload(@RequestParam("files") MultipartFile[] files) {
        List<String> names = new ArrayList<>();
        for (var file : files) {
            names.add(fileService.save(file));
        }
        return names;
    }
}
