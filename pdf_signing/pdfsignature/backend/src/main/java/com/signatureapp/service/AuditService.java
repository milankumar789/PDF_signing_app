package com.signatureapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.signatureapp.model.AuditLog;
import com.signatureapp.model.Document;
import com.signatureapp.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository
            auditLogRepository;

    public void log(
            Document document,
            String action,
            String performedBy
    ) {

        AuditLog auditLog =
                new AuditLog();

        auditLog.setDocument(
                document
        );

        auditLog.setAction(
                action
        );

        auditLog.setPerformedBy(
                performedBy
        );

        auditLog.setTimestamp(
                LocalDateTime.now()
        );

        auditLogRepository.save(
                auditLog
        );
    }

    public List<AuditLog> getLogs(
            Long documentId
    ) {

        return auditLogRepository
                .findByDocumentId(
                        documentId
                );
    }
}