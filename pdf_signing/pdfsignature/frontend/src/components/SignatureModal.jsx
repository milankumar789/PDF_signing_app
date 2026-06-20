import {
    useRef,
    useState
} from "react";

function SignatureModal({
    field,
    onSave,
    onClose
}) {

    const [signatureText,
        setSignatureText] =
        useState("");

    const [mode,
        setMode] =
        useState("TYPE");

    const canvasRef =
        useRef(null);

    const [drawing,
        setDrawing] =
        useState(false);

    const startDrawing =
        (event) => {

            const canvas =
                canvasRef.current;

            const ctx =
                canvas.getContext("2d");

            ctx.beginPath();

            ctx.moveTo(
                event.nativeEvent.offsetX,
                event.nativeEvent.offsetY
            );

            setDrawing(true);
        };

    const draw =
        (event) => {

            if (!drawing) {
                return;
            }

            const canvas =
                canvasRef.current;

            const ctx =
                canvas.getContext("2d");

            ctx.lineTo(
                event.nativeEvent.offsetX,
                event.nativeEvent.offsetY
            );

            ctx.stroke();
        };

    const stopDrawing =
        () => {

            setDrawing(false);
        };

    const clearCanvas =
        () => {

            const canvas =
                canvasRef.current;

            const ctx =
                canvas.getContext("2d");

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
        };

    const createTypedSignatureImage =
        () => {

            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.width = 600;
            canvas.height = 200;

            const ctx =
                canvas.getContext(
                    "2d"
                );

            ctx.fillStyle =
                "white";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle =
                "black";

            ctx.font =
                "48px cursive";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillText(
                signatureText,
                canvas.width / 2,
                canvas.height / 2
            );

            return canvas.toDataURL(
                "image/png"
            );
        };

    const handleSave =
        () => {

            if (
                mode === "TYPE"
            ) {

                if (
                    !signatureText.trim()
                ) {

                    alert(
                        "Please enter a signature"
                    );

                    return;
                }

                const imageData =
                    createTypedSignatureImage();

                console.log(
                    "Typed Signature Length:",
                    imageData.length
                );

                onSave(
                    imageData
                );

            } else {

                const imageData =
                    canvasRef.current
                        .toDataURL(
                            "image/png"
                        );

                console.log(
                    "Drawn Signature Length:",
                    imageData.length
                );

                onSave(
                    imageData
                );
            }
        };

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background:
                    "rgba(0,0,0,0.4)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                zIndex: 9999
            }}
        >

            <div
                style={{
                    background:
                        "white",

                    padding:
                        "20px",

                    borderRadius:
                        "10px",

                    minWidth:
                        "450px"
                }}
            >

                <h2>
                    Create Signature
                </h2>

                <p>
                    Field:
                    {" "}
                    {field.fieldType}
                </p>

                <div>

                    <button
                        onClick={() =>
                            setMode(
                                "TYPE"
                            )
                        }
                    >
                        Type
                    </button>

                    {" "}

                    <button
                        onClick={() =>
                            setMode(
                                "DRAW"
                            )
                        }
                    >
                        Draw
                    </button>

                </div>

                <br />

                {
                    mode ===
                    "TYPE" ? (

                        <div>

                            <input
                                type="text"
                                placeholder="Type Signature"
                                value={
                                    signatureText
                                }
                                onChange={(e) =>
                                    setSignatureText(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",

                                    padding:
                                        "10px"
                                }}
                            />

                            <br />
                            <br />

                            <div
                                style={{
                                    border:
                                        "1px solid #ddd",

                                    height:
                                        "100px",

                                    display:
                                        "flex",

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",

                                    fontFamily:
                                        "cursive",

                                    fontSize:
                                        "40px",

                                    background:
                                        "#fafafa"
                                }}
                            >
                                {
                                    signatureText ||
                                    "Preview"
                                }
                            </div>

                        </div>

                    ) : (

                        <div>

                            <canvas
                                ref={
                                    canvasRef
                                }
                                width={
                                    350
                                }
                                height={
                                    150
                                }
                                style={{
                                    border:
                                        "1px solid black",

                                    background:
                                        "white"
                                }}
                                onMouseDown={
                                    startDrawing
                                }
                                onMouseMove={
                                    draw
                                }
                                onMouseUp={
                                    stopDrawing
                                }
                                onMouseLeave={
                                    stopDrawing
                                }
                            />

                            <br />
                            <br />

                            <button
                                onClick={
                                    clearCanvas
                                }
                            >
                                Clear
                            </button>

                        </div>

                    )
                }

                <br />
                <br />

                <button
                    onClick={
                        handleSave
                    }
                >
                    Save
                </button>

                {" "}

                <button
                    onClick={
                        onClose
                    }
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}

export default SignatureModal;