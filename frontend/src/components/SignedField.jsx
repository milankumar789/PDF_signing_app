function SignedField({
    field,
    selectedSignedFieldId,
    setSelectedSignedFieldId,
    onOpenSignature,
    onDelete,
    onDragStart,
    onResizeStart,
    signerMode = false
}) {

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

    const getPlaceholder =
        (fieldType) => {

            switch (fieldType) {

                case "SIGNATURE":
                    return "Sign Here";

                case "INITIALS":
                    return "Initial Here";

                case "DATE":
                    return "Date Here";

                case "TEXT":
                    return "Text Here";

                default:
                    return fieldType;
            }
        };

    const signature =
        field.signatures &&
        field.signatures.length > 0
            ? field.signatures[0]
            : null;

    const signatureValue =
        signature
            ? signature.imagePath
            : null;

    const isSigned =
        !!signatureValue;

    const isSelected =
        selectedSignedFieldId ===
        field.id;

    const isDrawSignature =
        signatureValue &&
        signatureValue.startsWith(
            "data:image"
        );

    return (

        <div
            onClick={(event) => {

                event.stopPropagation();

                if (isSigned) {

                    setSelectedSignedFieldId(
                        field.id
                    );
                }
            }}

            onMouseDown={
                (!isSigned ||
                    isSelected)
                    ? (event) =>
                        onDragStart(
                            event,
                            field.id
                        )
                    : undefined
            }

            onDoubleClick={() => {

                if (!isSigned) {

                    onOpenSignature(
                        field
                    );
                }
            }}

            style={{
                position:
                    "absolute",

                left:
                    field.x,

                top:
                    field.y,

                width:
                    field.width,

                height:
                    field.height,

                ...(isSigned
                    ? {}
                    : getFieldStyle(
                        field.assignedRole
                    )),

                outline:
                    isSelected
                        ? "2px dashed #2563eb"
                        : "none",

                display:
                    "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                padding:
                    "4px",

                boxSizing:
                    "border-box",

                cursor:
                    (!isSigned ||
                        isSelected)
                        ? "move"
                        : "default",

                overflow:
                    "hidden"
            }}
        >

            {
                signatureValue ? (

                    isDrawSignature ? (

                        <img
                            src={
                                signatureValue
                            }
                            alt="Signature"
                            style={{
                                maxWidth:
                                    "100%",

                                maxHeight:
                                    "100%",

                                objectFit:
                                    "contain",

                                pointerEvents:
                                    "none"
                            }}
                        />

                    ) : (

                        <span
                            style={{
                                fontWeight:
                                    "bold",

                                fontStyle:
                                    "italic",

                                fontSize:
                                    "20px",

                                pointerEvents:
                                    "none"
                            }}
                        >
                            {
                                signatureValue
                            }
                        </span>

                    )

                ) : (

                    <span>
                        {
                            getPlaceholder(
                                field.fieldType
                            )
                        }
                    </span>

                )
            }

            {
    !signerMode &&
    (!isSigned ||
        isSelected) && (

        <span
            onClick={
                (event) =>
                    onDelete(
                        event,
                        field.id
                    )
            }
                        style={{
                            position:
                                "absolute",

                            top:
                                "2px",

                            right:
                                "4px",

                            color:
                                "red",

                            fontWeight:
                                "bold",

                            cursor:
                                "pointer",

                            zIndex:
                                10
                        }}
                    >
                        ✖
                    </span>
                )
            }

            {
    !signerMode &&
    (!isSigned ||
        isSelected) && (

        <div
            onMouseDown={
                (event) =>
                    onResizeStart(
                        event,
                        field.id
                    )
            }
                        style={{
                            position:
                                "absolute",

                            width:
                                "12px",

                            height:
                                "12px",

                            right:
                                "-6px",

                            bottom:
                                "-6px",

                            background:
                                "red",

                            cursor:
                                "nwse-resize",

                            zIndex:
                                10
                        }}
                    />
                )
            }

        </div>
    );
}

export default SignedField;