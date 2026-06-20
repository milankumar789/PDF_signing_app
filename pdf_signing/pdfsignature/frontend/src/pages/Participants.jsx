import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    addParticipant,
    getParticipants,
    deleteParticipant,
    startWorkflow
} from "../api/api";

function Participants() {

    const { documentId } =
        useParams();

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [role, setRole] =
        useState("SIGNER");

    const [participants,
        setParticipants] =
        useState([]);

    useEffect(() => {

        loadParticipants();

    }, []);

    const loadParticipants =
        async () => {

            try {

                const data =
                    await getParticipants(
                        documentId
                    );

                setParticipants(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const handleAdd =
        async () => {

            if (!email) {

                alert(
                    "Enter Email"
                );

                return;
            }

            try {

                await addParticipant(
                    Number(
                        documentId
                    ),
                    email,
                    role
                );

                setEmail("");

                setRole(
                    "SIGNER"
                );

                loadParticipants();

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Failed To Add Participant"
                );
            }
        };

    const handleDelete =
        async (
            participantId
        ) => {

            try {

                await deleteParticipant(
                    participantId
                );

                loadParticipants();

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const handleStartWorkflow =
        async () => {

            try {

                await startWorkflow(
                    documentId
                );

                alert(
                    "Workflow Started"
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Failed To Start Workflow"
                );
            }
        };

    const getRoleColor =
        (role) => {

            switch (role) {

                case "SIGNER":
                    return "bg-blue-100 text-blue-700";

                case "VALIDATOR":
                    return "bg-green-100 text-green-700";

                case "WITNESS":
                    return "bg-purple-100 text-purple-700";

                default:
                    return "bg-slate-100 text-slate-700";
            }
        };

    const getStatusColor =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "bg-yellow-100 text-yellow-700";

                case "SIGNED":
                    return "bg-green-100 text-green-700";

                case "APPROVED":
                    return "bg-blue-100 text-blue-700";

                case "REJECTED":
                    return "bg-red-100 text-red-700";

                default:
                    return "bg-slate-100 text-slate-700";
            }
        };

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}

                <div className="bg-linear-to-r from-indigo-700 to-blue-700 rounded-3xl p-8 text-white shadow-xl mb-8">

                    <h1 className="text-4xl font-bold">
                        Workflow Participants
                    </h1>

                    <p className="mt-3 text-blue-100">
                        Document #{documentId}
                    </p>

                    <p className="mt-2 text-blue-100">
                        Add signers, validators and witnesses
                        before starting the workflow.
                    </p>

                </div>

                {/* Add Participant Card */}

                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                        Add Participant
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                            className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                        <button
                            onClick={
                                handleAdd
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                        >
                            + Add Participant
                        </button>

                    </div>

                </div>

                {/* Participants */}

                <div className="space-y-5">

                    {
                        participants.map(
                            (
                                participant
                            ) => (

                                <div
                                    key={
                                        participant.id
                                    }
                                    className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold">

                                            {
                                                participant.email
                                                    .charAt(
                                                        0
                                                    )
                                                    .toUpperCase()
                                            }

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-800">
                                                {
                                                    participant.email
                                                }
                                            </h3>

                                            <div className="flex gap-2 mt-2">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                                        participant.role
                                                    )}`}
                                                >
                                                    {
                                                        participant.role
                                                    }
                                                </span>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                        participant.status
                                                    )}`}
                                                >
                                                    {
                                                        participant.status
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                participant.id
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            )
                        )
                    }

                    {
                        participants.length === 0 && (

                            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                                <div className="text-6xl mb-4">
                                    👥
                                </div>

                                <h3 className="text-2xl font-bold text-slate-800">
                                    No Participants Added
                                </h3>

                                <p className="text-slate-500 mt-3">
                                    Add at least one participant
                                    to start the workflow.
                                </p>

                            </div>

                        )
                    }

                </div>

                {/* Actions */}

                <div className="mt-10 flex flex-wrap gap-4">

                    <button
                        onClick={() =>
                            navigate(
                                `/editor/${documentId}`
                            )
                        }
                        className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Open Editor
                    </button>

                    <button
                        onClick={
                            handleStartWorkflow
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Start Workflow 
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Participants;