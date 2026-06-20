package com.signatureapp.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.signatureapp.model.enums.SignatureType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String participantEmail;

    @Enumerated(EnumType.STRING)
    private SignatureType signatureType;

    // @Lob
    @Column(columnDefinition = "TEXT")
    private String imagePath;

    private LocalDateTime signedAt;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "field_id")
    private DocumentField field;
}