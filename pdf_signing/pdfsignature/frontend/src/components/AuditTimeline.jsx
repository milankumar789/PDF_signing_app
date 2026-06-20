import { useEffect, useState } from "react";
import { getAuditLogs } from "../api/api";

function AuditTimeline({
    documentId,
    onClose
}) {

    const [logs, setLogs] =
        useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs =
        async () => {

            try {

                const data =
                    await getAuditLogs(
                        documentId
                    );

                setLogs(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background:
                    "rgba(0,0,0,0.5)",
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
                    width:
                        "700px",
                    maxHeight:
                        "80vh",
                    overflowY:
                        "auto",
                    borderRadius:
                        "12px",
                    padding:
                        "20px"
                }}
            >

                <div
                    style={{
                        display:
                            "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center"
                    }}
                >

                    <h2>
                        Audit Timeline
                    </h2>

                    <button
                        onClick={
                            onClose
                        }
                    >
                        Close
                    </button>

                </div>

                <hr />

                {
                    logs.map(
                        (log) => (

                            <div
                                key={log.id}
                                style={{
                                    padding:
                                        "12px",
                                    borderLeft:
                                        "4px solid #2563eb",
                                    marginBottom:
                                        "15px",
                                    background:
                                        "#f9fafb"
                                }}
                            >

                                <h4
                                    style={{
                                        margin:
                                            0
                                    }}
                                >
                                    {log.action}
                                </h4>

                                <p>
                                    By:
                                    {" "}
                                    {log.performedBy}
                                </p>

                                <small>
                                    {
                                        log.timestamp
                                    }
                                </small>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    );
}

export default AuditTimeline;