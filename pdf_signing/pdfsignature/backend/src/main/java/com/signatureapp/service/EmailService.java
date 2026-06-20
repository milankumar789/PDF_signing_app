package com.signatureapp.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendInvitation(
            String recipientEmail,
            String documentName,
            Long documentId,
            String role
    ) {

        String signLink =
                "http://localhost:5173/sign/"
                        + documentId
                        + "/"
                        + role
                        + "?email="
                        + recipientEmail;

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(
                recipientEmail
        );

        message.setSubject(
                "Document Signature Request"
        );

        message.setText(
                """
                Hello,

                You have been invited to sign document:

                """
                        + documentName
                        + "\n\nRole: "
                        + role
                        + "\n\nDocument ID: "
                        + documentId
                        + "\n\nSign using the link below:\n\n"
                        + signLink
                        + "\n\nRegards,\nPDF Signing App"
        );

        mailSender.send(
                message
        );
    }
}