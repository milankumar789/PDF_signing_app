package com.signatureapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.signatureapp.model.AuditLog;
import com.signatureapp.service.AuditService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService
            auditService;

    @GetMapping("/{documentId}")
    public List<AuditLog> getLogs(
            @PathVariable
            Long documentId
    ) {

        return auditService
                .getLogs(
                        documentId
                );
    }
}