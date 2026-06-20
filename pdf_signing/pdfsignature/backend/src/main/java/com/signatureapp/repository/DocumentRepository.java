package com.signatureapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}