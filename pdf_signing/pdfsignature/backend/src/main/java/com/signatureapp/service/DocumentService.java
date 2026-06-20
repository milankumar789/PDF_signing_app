package com.signatureapp.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.signatureapp.model.Document;
import com.signatureapp.model.enums.DocumentStatus;
import com.signatureapp.model.enums.WorkflowType;
import com.signatureapp.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    private final AuditService auditService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Document upload(
            MultipartFile file,
            WorkflowType workflowType)
            throws Exception {

        File directory =
                new File(uploadDir)
                        .getAbsoluteFile();

        if (!directory.exists()) {

            directory.mkdirs();
        }

        String fileName =
                file.getOriginalFilename();

        File destination =
                new File(
                        directory,
                        fileName
                );

        file.transferTo(
                destination
        );

        Document document =
                new Document();

        document.setFileName(
                fileName
        );

        document.setFilePath(
                destination.getAbsolutePath()
        );

        document.setStatus(
                DocumentStatus.DRAFT
        );

        document.setWorkflowType(
                workflowType
        );

        document.setUploadedAt(
                LocalDateTime.now()
        );

        Document savedDocument =
                documentRepository.save(
                        document
                );

        auditService.log(
                savedDocument,
                "Document Uploaded",
                "SYSTEM"
        );

        return savedDocument;
    }

    public List<Document> getAllDocuments() {

        return documentRepository.findAll();
    }

    public Document getDocument(
            Long id) {

        return documentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document not found"
                        ));
    }

    public Document updateStatus(
            Long documentId,
            String status) {

        Document document =
                documentRepository
                        .findById(
                                documentId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document not found"
                                ));

        DocumentStatus newStatus =
                DocumentStatus.valueOf(
                        status.toUpperCase()
                );

        document.setStatus(
                newStatus
        );

        Document savedDocument =
                documentRepository.save(
                        document
                );

        auditService.log(
                savedDocument,
                "Status Changed To " + newStatus,
                "SYSTEM"
        );

        return savedDocument;
    }
}