package com.signatureapp.service;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SignatureUploadService {

    @Value("${signature.upload-dir}")
    private String signatureDir;

    public String uploadSignature(
            MultipartFile file)
            throws Exception {

        File directory =
                new File(signatureDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                UUID.randomUUID()
                        + "_"
                        + file.getOriginalFilename();

        File destination =
                new File(directory, fileName);

        file.transferTo(destination);

        return destination.getAbsolutePath();
    }
}