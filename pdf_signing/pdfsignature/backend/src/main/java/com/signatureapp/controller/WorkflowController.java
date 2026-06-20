package com.signatureapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.signatureapp.dto.AddParticipantRequest;
import com.signatureapp.model.DocumentParticipant;
import com.signatureapp.service.WorkflowService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/workflow")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PostMapping("/participants")
    public DocumentParticipant addParticipant(
            @RequestBody
            AddParticipantRequest request) {

        return workflowService
                .addParticipant(request);
    }

    @GetMapping("/participants/{documentId}")
    public List<DocumentParticipant> getParticipants(
            @PathVariable
            Long documentId) {

        return workflowService
                .getParticipants(documentId);
    }

    @DeleteMapping("/participants/{participantId}")
    public String deleteParticipant(
            @PathVariable
            Long participantId) {

        workflowService.deleteParticipant(
                participantId
        );

        return "Participant Deleted";
    }

    @PostMapping("/{documentId}/start")
    public String startWorkflow(
            @PathVariable
            Long documentId) {

        workflowService.startWorkflow(
                documentId
        );

        return "Workflow Started";
    }
}