package com.signatureapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.signatureapp.dto.AddFieldRequest;
import com.signatureapp.model.Document;
import com.signatureapp.model.DocumentField;
import com.signatureapp.repository.DocumentFieldRepository;
import com.signatureapp.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FieldService {

    private final DocumentRepository documentRepository;

    private final DocumentFieldRepository fieldRepository;

    public DocumentField addField(
            AddFieldRequest request) {

        Document document =
                documentRepository.findById(
                        request.getDocumentId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Document not found"
                        ));

        DocumentField field =
                new DocumentField();

        field.setDocument(document);

        field.setPageNumber(
                request.getPageNumber()
        );

        field.setX(
                request.getX()
        );

        field.setY(
                request.getY()
        );

        field.setWidth(
                request.getWidth()
        );

        field.setHeight(
                request.getHeight()
        );

        field.setFieldType(
                request.getFieldType()
        );

        field.setAssignedRole(
                request.getAssignedRole()
        );

        field.setRequiredField(
                request.getRequiredField()
        );

        return fieldRepository.save(field);
    }

    public List<DocumentField> getFields(
            Long documentId) {

        Document document =
                documentRepository.findById(
                        documentId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Document not found"
                        ));

        return document.getFields();
    }

    public DocumentField updatePosition(
            Long fieldId,
            Float x,
            Float y) {

        DocumentField field =
                fieldRepository.findById(
                        fieldId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Field not found"
                        ));

        field.setX(x);
        field.setY(y);

        return fieldRepository.save(field);
    }

    public DocumentField updateSize(
            Long fieldId,
            Float width,
            Float height) {

        DocumentField field =
                fieldRepository.findById(
                        fieldId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Field not found"
                        ));

        field.setWidth(width);
        field.setHeight(height);

        return fieldRepository.save(field);
    }

    public void deleteField(Long fieldId) {

        fieldRepository.deleteById(fieldId);
    }
}