package com.signatureapp.dto;

import com.signatureapp.model.enums.RoleType;

import lombok.Data;

@Data
public class AddParticipantRequest {

    private Long documentId;

    private String email;

    private RoleType role;
}