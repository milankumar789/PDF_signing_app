package com.signatureapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.DocumentParticipant;

public interface DocumentParticipantRepository
        extends JpaRepository<DocumentParticipant, Long> {

    List<DocumentParticipant>
    findByDocument_IdOrderByIdAsc(
            Long documentId
    );
}