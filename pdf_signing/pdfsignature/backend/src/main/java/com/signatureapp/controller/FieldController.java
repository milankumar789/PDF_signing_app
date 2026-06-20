package com.signatureapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.signatureapp.dto.AddFieldRequest;
import com.signatureapp.model.DocumentField;
import com.signatureapp.service.FieldService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fields")
@RequiredArgsConstructor
public class FieldController {

    private final FieldService fieldService;

    @PostMapping
    public DocumentField addField(
            @RequestBody
            AddFieldRequest request) {

        return fieldService.addField(
                request
        );
    }

    @GetMapping("/document/{documentId}")
    public List<DocumentField> getFields(
            @PathVariable
            Long documentId) {

        return fieldService.getFields(
                documentId
        );
    }
    
    @PutMapping("/{fieldId}/position")
    public DocumentField updatePosition(
            @PathVariable
            Long fieldId,

            @RequestBody
            Map<String, Float> body) {

        return fieldService.updatePosition(
                fieldId,
                body.get("x"),
                body.get("y")
        );
    }

    @PutMapping("/{fieldId}/size")
    public DocumentField updateSize(
            @PathVariable
            Long fieldId,

            @RequestBody
            Map<String, Float> body) {

        return fieldService.updateSize(
                fieldId,
                body.get("width"),
                body.get("height")
        );
    }

    @DeleteMapping("/{fieldId}")
    public String deleteField(
            @PathVariable
            Long fieldId) {

        fieldService.deleteField(
                fieldId
        );

        return "Field Deleted";
    }
}