package com.signatureapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.signatureapp.dto.CreateSignatureRequest;
import com.signatureapp.model.Signature;
import com.signatureapp.service.SignatureService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/signatures")
@RequiredArgsConstructor
public class SignatureController {

    private final SignatureService
            signatureService;

    @PostMapping
    public Signature createSignature(
            @RequestBody
            CreateSignatureRequest request) {

        return signatureService
                .createSignature(request);
    }

    @GetMapping("/field/{fieldId}")
    public List<Signature> getSignatures(
            @PathVariable
            Long fieldId) {

        return signatureService
                .getFieldSignatures(
                        fieldId
                );
    }
}