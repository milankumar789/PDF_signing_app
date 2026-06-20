package com.signatureapp.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.signatureapp.model.Document;
import com.signatureapp.model.enums.WorkflowType;
import com.signatureapp.service.DocumentService;
import com.signatureapp.service.PdfSigningService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/docs")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    private final PdfSigningService pdfSigningService;

    @PostMapping("/upload")
    public Document upload(
            @RequestParam("file")
            MultipartFile file,

            @RequestParam("workflowType")
            WorkflowType workflowType)
            throws Exception {

        return documentService.upload(
                file,
                workflowType
        );
    }

    @GetMapping
    public List<Document> getAll() {

        return documentService
                .getAllDocuments();
    }

    @GetMapping("/{id}")
    public Document getById(
            @PathVariable Long id) {

        return documentService
                .getDocument(id);
    }

    @PutMapping("/{id}/status/{status}")
    public Document updateStatus(
            @PathVariable Long id,

            @PathVariable String status) {

        return documentService
                .updateStatus(
                        id,
                        status
                );
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(
            @PathVariable Long id)
            throws Exception {

        Document document =
                documentService.getDocument(id);

        Path path =
                Paths.get(
                        document.getFilePath()
                );

        Resource resource =
                new UrlResource(
                        path.toUri()
                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\""
                                + document.getFileName()
                                + "\""
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(resource);
    }

    @PostMapping("/{id}/finalize")
    public String finalizeDocument(
            @PathVariable Long id)
            throws Exception {

        return pdfSigningService
                .finalizeDocument(id);
    }

    @GetMapping("/download-signed/{fileName}")
    public ResponseEntity<Resource> downloadSigned(
            @PathVariable String fileName)
            throws Exception {

        Path path =
                Paths.get(
                        "D:\\projects\\pdfsignature\\pdfsignature\\signed",
                        fileName
                );

        Resource resource =
                new UrlResource(
                        path.toUri()
                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + fileName
                                + "\""
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(resource);
    }
}