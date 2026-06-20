package com.signatureapp.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.signatureapp.model.enums.DocumentStatus;
import com.signatureapp.model.enums.WorkflowType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String filePath;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    private LocalDateTime uploadedAt;

    @Enumerated(EnumType.STRING)
    private WorkflowType workflowType;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "document",
            cascade = CascadeType.ALL
    )
    private List<DocumentParticipant> participants;

    @OneToMany(
            mappedBy = "document",
            cascade = CascadeType.ALL
    )
    private List<DocumentField> fields;
}