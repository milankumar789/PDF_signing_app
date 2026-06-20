import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    Document,
    Page,
    pdfjs
} from "react-pdf";

import {
    createField,
    createSignature,
    deleteField,
    getFields,
    updateFieldPosition,
    updateFieldSize,
    finalizeDocument
} from "../api/api";

import SignatureModal
    from "./SignatureModal";

import SignedField
    from "./SignedField";

pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
    ).toString();

function PdfViewer({
    documentId,
    activeRole,
    activeFieldType,
    signerMode = false,
    signerRole = null,
    signerEmail = null
}) {

    const [numPages, setNumPages] =
        useState(null);

    const [fields, setFields] =
        useState([]);

    const [draggingField,
        setDraggingField] =
        useState(null);

    const [resizingField,
        setResizingField] =
        useState(null);

    const [selectedField,
    setSelectedField] =
    useState(null);

    const [selectedSignedFieldId,
    setSelectedSignedFieldId] =
    useState(null);

    const containerRef =
    useRef(null);

    const animationFrameRef =
    useRef(null);

    const [dragOffset,
    setDragOffset] =
    useState({
        x: 0,
        y: 0
    });

const [showSignatureModal,
    setShowSignatureModal] =
    useState(false);

    const pdfUrl =
        `http://localhost:8080/api/docs/${documentId}/download`;

    useEffect(() => {

        loadFields();

    }, [documentId]);

    const loadFields =
        async () => {

            try {

                const data =
                    await getFields(
                        documentId
                    );

                if (
    signerMode &&
    signerRole
) {

    setFields(

        data.filter(
            field =>
                field.assignedRole ===
                signerRole
        )

    );

} else {

    setFields(
        data
    );
}

            } //catch (error) {

            //     console.error(error);
            // }
            catch (error) {

    console.log(
        "STATUS:",
        error.response?.status
    );

    console.log(
        "DATA:",
        error.response?.data
    );

    console.error(
        error
    );
}
        };

    const onDocumentLoadSuccess =
        ({ numPages }) => {

            setNumPages(
                numPages
            );
        };

    const getFieldStyle =
        (role) => {

            switch (role) {

                case "SIGNER":

                    return {
                        border:
                            "2px solid #2563eb",

                        background:
                            "rgba(37,99,235,0.15)"
                    };

                case "VALIDATOR":

                    return {
                        border:
                            "2px solid #16a34a",

                        background:
                            "rgba(22,163,74,0.15)"
                    };

                case "WITNESS":

                    return {
                        border:
                            "2px solid #ea580c",

                        background:
                            "rgba(234,88,12,0.15)"
                    };

                default:

                    return {
                        border:
                            "2px solid red",

                        background:
                            "rgba(255,0,0,0.1)"
                    };
            }
        };

    const getFieldLabel =
        (fieldType) => {

            switch (fieldType) {

                case "SIGNATURE":
                    return "Sign Here";

                case "INITIALS":
                    return "Initial Here";

                case "DATE":
                    return "Date Here";

                case "TEXT":
                    return "Text Field";

                default:
                    return fieldType;
            }
        };

    const handleClick =
        async (event) => {

            if (
                draggingField ||
                resizingField
            ) {
                return;
            }

            const rect =
                event.currentTarget
                    .getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const newField = {

                documentId:
                    Number(documentId),

                pageNumber: 1,

                x,

                y,

                width: 150,

                height: 50,

                fieldType:
                    activeFieldType,

                assignedRole:
                    activeRole,

                requiredField:
                    true
            };

            try {

                const savedField =
                    await createField(
                        newField
                    );

                setFields(
                    previous => [
                        ...previous,
                        savedField
                    ]
                );

            } catch (error) {

                console.error(error);
            }
        };

    const handleDelete =
        async (
            event,
            fieldId
        ) => {

            event.stopPropagation();

            try {

                await deleteField(
                    fieldId
                );

                setFields(
                    previous =>
                        previous.filter(
                            field =>
                                field.id !==
                                fieldId
                        )
                );

            } catch (error) {

                console.error(error);
            }
        };

    const handleDragStart =
(
    event,
    fieldId
) => {

    if (signerMode) {

        return;
    }

    event.stopPropagation();

    const field =
        fields.find(
            f =>
                f.id ===
                fieldId
        );
        if (!field) {
            return;
        }

        const rect =
            containerRef.current
                .getBoundingClientRect();

        setDragOffset({

            x:
                event.clientX -
                rect.left -
                field.x,

            y:
                event.clientY -
                rect.top -
                field.y
        });

        setDraggingField(
            fieldId
        );
    };
    const handleResizeStart =
    (
        event,
        fieldId
    ) => {

        if (signerMode) {

            return;
        }

        event.stopPropagation();

        setResizingField(
            fieldId
        );
    };

    const handleMouseMove =
        (
            event
        ) => {

            if (
                !draggingField &&
                !resizingField
            ) {
                return;
            }

            const rect =
    containerRef.current
        .getBoundingClientRect();

const x =
    event.clientX -
    rect.left;

const y =
    event.clientY -
    rect.top;

            if (draggingField) {

    if (
        animationFrameRef.current
    ) {

        cancelAnimationFrame(
            animationFrameRef.current
        );
    }

    animationFrameRef.current =
        requestAnimationFrame(
            () => {

                setFields(
                    previous =>
                        previous.map(
                            field => {

                                if (
                                    field.id !==
                                    draggingField
                                ) {

                                    return field;
                                }

                                return {

                                    ...field,

                                    x:
                                        x -
                                        dragOffset.x,

                                    y:
                                        y -
                                        dragOffset.y
                                };
                            }
                        )
                );
            }
        );
}
            if (resizingField) {

                setFields(
                    previous =>
                        previous.map(
                            field => {

                                if (
                                    field.id !==
                                    resizingField
                                ) {
                                    return field;
                                }

                                return {
                                    ...field,

                                    width:
                                        Math.max(
                                            100,
                                            x - field.x
                                        ),

                                    height:
                                        Math.max(
                                            40,
                                            y - field.y
                                        )
                                };
                            }
                        )
                );
            }
        };

    const handleMouseUp =
        async () => {

            if (draggingField) {

                const field =
                    fields.find(
                        field =>
                            field.id ===
                            draggingField
                    );

                if (field) {

                    try {

                        await updateFieldPosition(
                            field.id,
                            field.x,
                            field.y
                        );

                    } catch (error) {

                        console.error(error);
                    }
                }
                
                if (
    animationFrameRef.current
) {

    cancelAnimationFrame(
        animationFrameRef.current
    );

    animationFrameRef.current =
        null;
}

                setDraggingField(
                    null
                );
                
            }

            if (resizingField) {

                const field =
                    fields.find(
                        field =>
                            field.id ===
                            resizingField
                    );

                if (field) {

                    try {

                        await updateFieldSize(
                            field.id,
                            field.width,
                            field.height
                        );

                    } catch (error) {

                        console.error(error);
                    }
                }

                setResizingField(
                    null
                );
            }
        };

      const handleOpenSignature =
    (field) => {

        setSelectedField(
            field
        );

        setShowSignatureModal(
            true
        );
    };

const handleSignatureSave =
    async (
        signatureText
    ) => {

        try {

           
const signatureType =
    signatureText.startsWith(
        "data:image"
    )
        ? "DRAW"
        : "TYPE";

const participantEmail =
    signerMode
        ? signerEmail
        : localStorage.getItem(
              "email"
          );

await createSignature(
    selectedField.id,
    participantEmail,
    signatureType,
    signatureText
);
            setShowSignatureModal(
                false
            );

            setSelectedField(
                null
            );

            await loadFields();

        } catch (error) {

            console.error(
                error
            );
        }
    }; 
    const handleFinalizeDocument =
    async () => {

        try {

            const filePath =
                await finalizeDocument(
                    documentId
                );

            const fileName =
                filePath.split(
                    "\\"
                ).pop();

            window.open(
                `http://localhost:8080/api/docs/download-signed/${fileName}`,
                "_blank"
            );

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Failed to finalize PDF"
            );
        }
    }; 

    return (

        <div>

            <h2>
                PDF Preview
            </h2>

            {
    !signerMode && (

        <div
            style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "inline-block"
            }}
        >

            {/* Creating

            <strong>
                {" "}
                {activeFieldType}
                {" "}
            </strong>

            For

            <strong>
                {" "}
                {activeRole}
            </strong> */}

        </div>

    )
}

            <div
    ref={containerRef}
    onClick={() =>
        setSelectedSignedFieldId(
            null
        )
    }
    style={{
        position:
            "relative",

        display:
            "inline-block"
    }}
                onMouseMove={
                    handleMouseMove
                }
                onMouseUp={
                    handleMouseUp
                }
            >

                <Document
                    file={pdfUrl}
                    onLoadSuccess={
                        onDocumentLoadSuccess
                    }
                >

                    <div
    onClick={(event) => {

        setSelectedSignedFieldId(
            null
        );
        
        if (signerMode) {

    return;
}

        handleClick(
            event
        );
    }}
>

                        <Page
                            pageNumber={1}
                            width={800}
                        />

                    </div>

                </Document>

              {fields.map(
    field => (

        <SignedField
    key={
        field.id
    }

    field={
        field
    }

    selectedSignedFieldId={
        selectedSignedFieldId
    }

    setSelectedSignedFieldId={
        setSelectedSignedFieldId
    }

    onOpenSignature={
        handleOpenSignature
    }

    onDelete={
        handleDelete
    }

    onDragStart={
        handleDragStart
    }

    onResizeStart={
        handleResizeStart
    }

    signerMode={
        signerMode
    }
/>
    )
)}

            </div>
             
             {
    showSignatureModal &&
    selectedField && (

        <SignatureModal
            field={
                selectedField
            }

            onSave={
                handleSignatureSave
            }

            onClose={() => {

                setShowSignatureModal(
                    false
                );

                setSelectedField(
                    null
                );

            }}
        />

    )
}

            <br />
            
            <br />
<br />

{
    !signerMode && (

        <button
            onClick={
                handleFinalizeDocument
            }
            style={{
                padding: "12px 20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
            }}
        >
            Finalize & Download PDF
        </button>

    )
}

<br />
<br />

            <strong>
                Pages:
            </strong>

            {" "}
            {numPages}

        </div>
    );
}

export default PdfViewer;