package com.signatureapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.Signature;

public interface SignatureRepository
        extends JpaRepository<Signature, Long> {

    List<Signature> findByFieldId(Long fieldId);
}