package com.signatureapp.dto;

import com.signatureapp.model.enums.FieldType;
import com.signatureapp.model.enums.RoleType;

import lombok.Data;

@Data
public class AddFieldRequest {

    private Long documentId;

    private Integer pageNumber;

    private Float x;

    private Float y;

    private Float width;

    private Float height;

    private FieldType fieldType;

    private RoleType assignedRole;

    private Boolean requiredField;
}