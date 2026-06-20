package com.signatureapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByDocumentId(Long documentId);

}