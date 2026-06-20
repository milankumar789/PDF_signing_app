import { useEffect, useState } from "react";
import api from "../api/api";
import AuditTimeline from "./AuditTimeline";

function DocumentList() {

    const [documents, setDocuments] =
        useState([]);

    const [
        selectedDocumentId,
        setSelectedDocumentId
    ] = useState(null);

    useEffect(() => {

        loadDocuments();

    }, []);

    const loadDocuments = async () => {

        try {

            const response =
                await api.get("/api/docs");

            setDocuments(
                response.data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    };

    const getStatusColor =
        (status) => {

            switch (status) {

                case "DRAFT":

                    return "bg-yellow-100 text-yellow-800";

                case "SENT":

                    return "bg-blue-100 text-blue-800";

                case "IN_PROGRESS":

                    return "bg-orange-100 text-orange-800";

                case "COMPLETED":

                    return "bg-green-100 text-green-800";

                default:

                    return "bg-slate-100 text-slate-700";
            }
        };

    return (

        <div className="mt-10">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        Documents
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Manage uploaded PDFs and track workflows
                    </p>

                </div>

                <div className="bg-white px-4 py-2 rounded-xl shadow">

                    <span className="text-slate-600">
                        Total:
                    </span>

                    <span className="ml-2 font-bold text-slate-800">
                        {documents.length}
                    </span>

                </div>

            </div>

            {
                documents.length === 0 && (

                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                        <div className="text-6xl mb-4">
                            📂
                        </div>

                        <h3 className="text-2xl font-bold text-slate-800">
                            No Documents Yet
                        </h3>

                        <p className="text-slate-500 mt-3">
                            Upload your first PDF to start
                            creating signature workflows.
                        </p>

                    </div>

                )
            }

            <div className="grid gap-6">

                {
                    documents.map(
                        (doc) => (

                            <div
                                key={doc.id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition border border-slate-200 p-6"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                    {/* Left */}

                                    <div>

                                        <div className="flex items-center gap-3">

                                            

                                            <div>

                                                <h3 className="text-xl font-bold text-slate-800">

                                                    {doc.fileName}

                                                </h3>

                                                <p className="text-slate-500 text-sm">

                                                    Document #{doc.id}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-3">

                                            <div className="bg-slate-100 px-3 py-2 rounded-lg text-sm">

                                                Workflow:
                                                {" "}
                                                <span className="font-semibold">
                                                    {doc.workflowType}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <div className="flex flex-col md:items-end gap-3">

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                                doc.status
                                            )}`}
                                        >

                                            {doc.status}

                                        </span>

                                        <button
                                            onClick={() =>
                                                setSelectedDocumentId(
                                                    doc.id
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
                                        >
                                            View Audit Trail
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

            {
                selectedDocumentId && (

                    <AuditTimeline
                        documentId={
                            selectedDocumentId
                        }
                        onClose={() =>
                            setSelectedDocumentId(
                                null
                            )
                        }
                    />

                )
            }

        </div>

    );
}

export default DocumentList;