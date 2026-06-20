package com.signatureapp.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.signatureapp.model.Document;
import com.signatureapp.model.DocumentField;
import com.signatureapp.model.Signature;
import com.signatureapp.repository.DocumentRepository;
import com.signatureapp.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PdfSigningService {

    private final DocumentRepository documentRepository;

    private final SignatureRepository signatureRepository;

    private final AuditService auditService;

    @Value("${signed.output-dir}")
    private String signedDir;

    public String finalizeDocument(Long documentId)
            throws Exception {

        Document document =
                documentRepository.findById(documentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document not found"
                                ));

        File pdfFile =
                new File(
                        document.getFilePath()
                );

        try (
                PDDocument pdDocument =
                        Loader.loadPDF(pdfFile)
        ) {

            List<DocumentField> fields =
                    document.getFields();

            for (DocumentField field : fields) {

                if (!"SIGNATURE".equals(
                        field.getFieldType().name()
                )) {

                    continue;
                }

                List<Signature> signatures =
                        signatureRepository
                                .findByFieldId(
                                        field.getId()
                                );

                if (signatures.isEmpty()) {

                    continue;
                }

                Signature signature =
                        signatures.get(0);

                String imageData =
                        signature.getImagePath();

                if (
                        imageData == null
                                || imageData.isBlank()
                ) {

                    continue;
                }

                if (
                        !imageData.startsWith(
                                "data:image"
                        )
                ) {

                    continue;
                }

                String base64Image =
                        imageData.substring(
                                imageData.indexOf(",") + 1
                        );

                byte[] imageBytes =
                        Base64.getDecoder()
                                .decode(
                                        base64Image
                                );

                BufferedImage bufferedImage =
                        ImageIO.read(
                                new ByteArrayInputStream(
                                        imageBytes
                                )
                        );

                if (
                        bufferedImage == null
                ) {

                    continue;
                }

                PDPage page =
                        pdDocument.getPage(
                                field.getPageNumber() - 1
                        );

                PDImageXObject image =
                        LosslessFactory.createFromImage(
                                pdDocument,
                                bufferedImage
                        );

                float pageHeight =
                        page.getMediaBox()
                                .getHeight();

                float pdfY =
                        pageHeight
                                - field.getY()
                                - field.getHeight();

                try (
                        PDPageContentStream stream =
                                new PDPageContentStream(
                                        pdDocument,
                                        page,
                                        PDPageContentStream.AppendMode.APPEND,
                                        false,
                                        true
                                )
                ) {

                    stream.drawImage(
                            image,
                            field.getX(),
                            pdfY,
                            field.getWidth(),
                            field.getHeight()
                    );
                }
            }

            File outputFolder =
                    new File(
                            signedDir
                    );

            if (
                    !outputFolder.exists()
            ) {

                outputFolder.mkdirs();
            }

            String outputName =
                    UUID.randomUUID()
                            + "_signed_"
                            + document.getFileName();

            File outputFile =
                    new File(
                            outputFolder,
                            outputName
                    );

            pdDocument.save(
                    outputFile
            );

            auditService.log(
                    document,
                    "PDF Finalized",
                    "SYSTEM"
            );

            return outputFile
                    .getAbsolutePath();
        }
    }
}