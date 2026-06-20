package com.signatureapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.signatureapp.model.enums.FieldType;
import com.signatureapp.model.enums.RoleType;

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
public class DocumentField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer pageNumber;

    private Float x;

    private Float y;

    private Float width;

    private Float height;

    @Enumerated(EnumType.STRING)
    private FieldType fieldType;

    @Enumerated(EnumType.STRING)
    private RoleType assignedRole;

    private Boolean requiredField;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "field",
            cascade = CascadeType.ALL
    )
    private List<Signature> signatures =
            new ArrayList<>();

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;
}