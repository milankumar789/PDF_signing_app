import { useState } from "react";
import { useParams } from "react-router-dom";

import PdfViewer from "../components/PdfViewer";

function Editor() {

    const { documentId } =
        useParams();

    const [activeRole,
        setActiveRole] =
        useState("SIGNER");

    const [activeFieldType,
        setActiveFieldType] =
        useState("SIGNATURE");

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Header */}

            <div className="bg-white border-b border-slate-200 shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-5">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                            <h1 className="text-3xl font-bold text-slate-800">
                                PDF Editor
                            </h1>

                            <p className="text-slate-500 mt-1">
                                Document #{documentId}
                            </p>

                        </div>

                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium">

                            Drag and place fields on the PDF

                        </div>

                    </div>

                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Toolbar */}

                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        Field Configuration
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Role */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-700 mb-2">

                                Assigned Role

                            </label>

                            <select
                                value={activeRole}
                                onChange={(e) =>
                                    setActiveRole(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="SIGNER">
                                    Signer
                                </option>

                                <option value="VALIDATOR">
                                    Validator
                                </option>

                                <option value="WITNESS">
                                    Witness
                                </option>

                            </select>

                        </div>

                        {/* Field Type */}

                        <div>

                            <label className="block text-sm font-semibold text-slate-700 mb-2">

                                Field Type

                            </label>

                            <select
                                value={activeFieldType}
                                onChange={(e) =>
                                    setActiveFieldType(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="SIGNATURE">
                                    Signature
                                </option>

                                <option value="INITIALS">
                                    Initials
                                </option>

                                <option value="DATE">
                                    Date
                                </option>

                                <option value="TEXT">
                                    Text
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* Field Legend */}

                    <div className="mt-6 flex flex-wrap gap-3">

                        <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium">
                            Signature
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium">
                            Initials
                        </span>

                        <span className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm font-medium">
                            Date
                        </span>

                        <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium">
                            Text
                        </span>

                    </div>

                </div>

                {/* PDF Viewer */}

                <div className="bg-white rounded-3xl shadow-xl p-4">

                    <PdfViewer
                        documentId={documentId}
                        activeRole={activeRole}
                        activeFieldType={activeFieldType}
                    />

                </div>

            </div>

        </div>

    );
}

export default Editor;