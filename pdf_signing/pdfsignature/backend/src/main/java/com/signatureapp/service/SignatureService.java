package com.signatureapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.signatureapp.dto.CreateSignatureRequest;
import com.signatureapp.model.Document;
import com.signatureapp.model.DocumentField;
import com.signatureapp.model.DocumentParticipant;
import com.signatureapp.model.Signature;
import com.signatureapp.model.enums.DocumentStatus;
import com.signatureapp.model.enums.ParticipantStatus;
import com.signatureapp.repository.DocumentFieldRepository;
import com.signatureapp.repository.DocumentParticipantRepository;
import com.signatureapp.repository.DocumentRepository;
import com.signatureapp.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignatureService {

    private final SignatureRepository signatureRepository;

    private final DocumentFieldRepository fieldRepository;

    private final DocumentRepository documentRepository;

    private final DocumentParticipantRepository
            participantRepository;

    private final EmailService
            emailService;

    private final AuditService
            auditService;

    public Signature createSignature(
            CreateSignatureRequest request) {

        DocumentField field =
                fieldRepository.findById(
                        request.getFieldId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Field not found"
                        ));

        Signature signature =
                new Signature();

        signature.setField(
                field
        );

        signature.setParticipantEmail(
                request.getParticipantEmail()
        );

        signature.setSignatureType(
                request.getSignatureType()
        );

        signature.setImagePath(
                request.getImagePath()
        );

        signature.setSignedAt(
                LocalDateTime.now()
        );

        Signature savedSignature =
                signatureRepository.save(
                        signature
                );

        Document document =
                field.getDocument();

        auditService.log(
                document,
                "Signature Added",
                request.getParticipantEmail()
        );

        if (
                document.getStatus()
                        == DocumentStatus.SENT
        ) {

            document.setStatus(
                    DocumentStatus.IN_PROGRESS
            );

            documentRepository.save(
                    document
            );

            auditService.log(
                    document,
                    "Document Moved To IN_PROGRESS",
                    request.getParticipantEmail()
            );
        }

        List<DocumentParticipant> participants =
                participantRepository
                        .findByDocument_IdOrderByIdAsc(
                                document.getId()
                        );

        for (
                int i = 0;
                i < participants.size();
                i++
        ) {

            DocumentParticipant current =
                    participants.get(i);

            if (
                    current.getEmail()
                            .equalsIgnoreCase(
                                    request.getParticipantEmail()
                            )
            ) {

                current.setStatus(
                        ParticipantStatus.SIGNED
                );

                participantRepository.save(
                        current
                );

                auditService.log(
                        document,
                        "Participant Signed: "
                                + current.getEmail(),
                        current.getEmail()
                );

                if (
                        i + 1
                                < participants.size()
                ) {

                    DocumentParticipant next =
                            participants.get(
                                    i + 1
                            );

                    emailService.sendInvitation(
                            next.getEmail(),
                            document.getFileName(),
                            document.getId(),
                            next.getRole().name()
                    );

                    auditService.log(
                            document,
                            "Invitation Sent To "
                                    + next.getEmail()
                                    + " As "
                                    + next.getRole(),
                            "SYSTEM"
                    );
                }

                break;
            }
        }

        boolean allRequiredSigned =
                document.getFields()
                        .stream()
                        .filter(
                                f ->
                                        Boolean.TRUE.equals(
                                                f.getRequiredField()
                                        )
                        )
                        .allMatch(
                                f ->
                                        !signatureRepository
                                                .findByFieldId(
                                                        f.getId()
                                                )
                                                .isEmpty()
                        );

        if (
                allRequiredSigned
        ) {

            document.setStatus(
                    DocumentStatus.COMPLETED
            );

            documentRepository.save(
                    document
            );

            auditService.log(
                    document,
                    "Document Completed",
                    request.getParticipantEmail()
            );
        }

        return savedSignature;
    }

    public List<Signature> getFieldSignatures(
            Long fieldId) {

        return signatureRepository
                .findByFieldId(
                        fieldId
                );
    }
}