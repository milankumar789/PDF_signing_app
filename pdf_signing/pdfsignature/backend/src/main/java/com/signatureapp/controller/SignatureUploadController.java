package com.signatureapp.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.signatureapp.service.SignatureUploadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/signatures")
@RequiredArgsConstructor
public class SignatureUploadController {

    private final SignatureUploadService
            signatureUploadService;

    @PostMapping("/upload")
    public Map<String, String> upload(
            @RequestParam("file")
            MultipartFile file)
            throws Exception {

        String path =
                signatureUploadService
                        .uploadSignature(file);

        return Map.of(
                "path",
                path
        );
    }
}