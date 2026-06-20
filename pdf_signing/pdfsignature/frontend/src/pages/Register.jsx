import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const register = async () => {

        try {

            await api.post(
                "/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch {

            alert(
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center px-6">

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Section */}

                <div className="hidden lg:block text-white">

                    <h1 className="text-6xl font-bold leading-tight">
                        Join The
                        <span className="block text-blue-400">
                            Future Of Signing
                        </span>
                    </h1>

                    <p className="mt-6 text-xl text-slate-300">
                        Create your account and start managing
                        documents, approvals and digital signatures
                        in one secure platform.
                    </p>

                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Upload & Manage PDFs
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Sequential Workflow Support
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Audit Trail Tracking
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Secure Digital Signatures
                            </span>
                        </div>

                    </div>

                </div>

                {/* Register Card */}

                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

                    <div className="text-center mb-8">

            

                        <h2 className="text-3xl font-bold text-white">
                            Create Account
                        </h2>

                        <p className="text-slate-300 mt-2">
                            Start signing documents today
                        </p>

                    </div>

                    <div className="space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={register}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition duration-300"
                        >
                            Create Account
                        </button>

                    </div>

                    <p className="text-center text-slate-300 mt-8">

                        Already have an account?

                        <Link
                            to="/"
                            className="text-blue-400 ml-2 font-semibold hover:text-blue-300"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}

export default Register;