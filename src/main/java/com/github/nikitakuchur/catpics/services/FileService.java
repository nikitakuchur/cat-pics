package com.github.nikitakuchur.catpics.services;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

/**
 * The file service allows you to load and save files from/to the file storage.
 */
@Service
public class FileService {

    private static final String FILE_DIRECTORY = "files/";

    /**
     * Load the file from the file storage.
     *
     * @param filename the file's name
     * @return the resource
     */
    public Resource load(String filename) {
        String filepath = FILE_DIRECTORY + filename;
        if (!Files.exists(Path.of(filepath))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Can't find the file named '%s'", filename));
        }
        return new FileSystemResource(filepath);
    }

    /**
     * Save the given file to the file storage.
     *
     * @param file the file
     * @return the name of the file
     */
    public String save(MultipartFile file) {
        var uuid = UUID.randomUUID().toString().replace("-", "");
        var extension = Optional.ofNullable(file.getOriginalFilename())
                .map(this::getExtension)
                .orElse("");
        try {
            var dirPath = Path.of(FILE_DIRECTORY);
            if (!Files.exists(dirPath)) {
                Files.createDirectory(dirPath);
            }
            var filename = uuid + "." + extension;
            Files.write(Path.of(FILE_DIRECTORY + filename), file.getBytes());
            return filename;
        } catch (IOException e) {
            throw new IllegalStateException("Can't save a file");
        }
    }

    private String getExtension(String name) {
        var splitName = name.split("\\.");
        if (splitName.length < 1) {
            return "";
        }
        return splitName[splitName.length - 1];
    }
}
