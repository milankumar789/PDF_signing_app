import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function UploadDocument() {

    const navigate =
        useNavigate();

    const [file, setFile] =
        useState(null);

    const [workflowType,
        setWorkflowType] =
        useState("SELF_SIGN");

    const uploadDocument =
        async () => {

            if (!file) {

                alert(
                    "Please select a PDF"
                );

                return;
            }

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "workflowType",
                workflowType
            );

            try {

                const response =
                    await api.post(
                        "/api/docs/upload",
                        formData
                    );

                const documentId =
                    response.data.id;

                if (
                    workflowType ===
                    "SELF_SIGN"
                ) {

                    navigate(
                        `/editor/${documentId}`
                    );

                } else {

                    navigate(
                        `/participants/${documentId}`
                    );
                }

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Upload Failed"
                );
            }
        };

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-800">
                    Upload Document
                </h2>

                <p className="text-slate-500 mt-2">
                    Upload a PDF and choose how
                    the signing workflow should
                    proceed.
                </p>

            </div>

            {/* Upload Box */}

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50">

                

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
                        )
                    }
                    className="block mx-auto"
                />

                <p className="mt-4 text-slate-600">

                    {
                        file
                            ? file.name
                            : "Select a PDF document"
                    }

                </p>

            </div>

            {/* Workflow Selection */}

            <div className="mt-8">

                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Select Workflow
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                    <div
                        onClick={() =>
                            setWorkflowType(
                                "SELF_SIGN"
                            )
                        }
                        className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                            workflowType === "SELF_SIGN"
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-200 bg-white"
                        }`}
                    >

                        <h4 className="font-bold text-slate-800">
                            Self Sign
                        </h4>

                        <p className="text-slate-500 text-sm mt-2">
                            Only you need to sign
                            this document.
                        </p>

                    </div>

                    <div
                        onClick={() =>
                            setWorkflowType(
                                "MULTI_PARTY"
                            )
                        }
                        className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                            workflowType === "MULTI_PARTY"
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-200 bg-white"
                        }`}
                    >

                        <h4 className="font-bold text-slate-800">
                            Multi Party
                        </h4>

                        <p className="text-slate-500 text-sm mt-2">
                            Invite signers,
                            validators and witnesses.
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8">

                <button
                    onClick={
                        uploadDocument
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Continue →
                </button>

            </div>

        </div>

    );
}

export default UploadDocument;