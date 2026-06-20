package com.signatureapp.dto;

import com.signatureapp.model.enums.WorkflowType;

import lombok.Data;

@Data
public class UploadDocumentRequest {

    private WorkflowType workflowType;
}