package com.signatureapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.DocumentField;

public interface DocumentFieldRepository
        extends JpaRepository<DocumentField, Long> {
}