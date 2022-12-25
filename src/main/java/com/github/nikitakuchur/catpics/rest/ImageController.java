package com.github.nikitakuchur.catpics.rest;

import com.github.nikitakuchur.catpics.services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/images")
public class ImageController {

    private final FileService fileService;

    @GetMapping(value = "/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
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
