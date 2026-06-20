package com.signatureapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.signatureapp.dto.AddParticipantRequest;
import com.signatureapp.model.Document;
import com.signatureapp.model.DocumentParticipant;
import com.signatureapp.model.enums.ParticipantStatus;
import com.signatureapp.repository.DocumentParticipantRepository;
import com.signatureapp.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final DocumentRepository documentRepository;

    private final DocumentParticipantRepository
            participantRepository;

    private final EmailService
            emailService;

    private final AuditService
            auditService;

    public DocumentParticipant addParticipant(
            AddParticipantRequest request) {

        Document document =
                documentRepository.findById(
                        request.getDocumentId()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Document not found"
                        )
                );

        DocumentParticipant participant =
                new DocumentParticipant();

        participant.setEmail(
                request.getEmail()
        );

        participant.setRole(
                request.getRole()
        );

        participant.setStatus(
                ParticipantStatus.PENDING
        );

        participant.setDocument(
                document
        );

        return participantRepository.save(
                participant
        );
    }

    public void startWorkflow(
            Long documentId) {

        Document document =
                documentRepository.findById(
                        documentId
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Document not found"
                        )
                );

        List<DocumentParticipant> participants =
                participantRepository
                        .findByDocument_IdOrderByIdAsc(
                                documentId
                        );

        if (participants.isEmpty()) {

            throw new RuntimeException(
                    "No participants found"
            );
        }

        DocumentParticipant first =
                participants.get(0);

        emailService.sendInvitation(
                first.getEmail(),
                document.getFileName(),
                document.getId(),
                first.getRole().name()
        );

        auditService.log(
                document,
                "Workflow Started. Invitation Sent To "
                        + first.getEmail(),
                "SYSTEM"
        );
    }

    public List<DocumentParticipant> getParticipants(
            Long documentId) {

        Document document =
                documentRepository.findById(
                        documentId
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Document not found"
                        )
                );

        return document.getParticipants();
    }

    public void deleteParticipant(
            Long participantId) {

        participantRepository.deleteById(
                participantId
        );
    }
}