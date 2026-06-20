package com.signatureapp.dto;

import com.signatureapp.model.enums.SignatureType;

import lombok.Data;

@Data
public class CreateSignatureRequest {

    private Long fieldId;

    private String participantEmail;

    private SignatureType signatureType;

    private String imagePath;
}