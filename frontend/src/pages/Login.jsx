import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response =
                await api.post(
                    "/api/auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "email",
                email
            );

            navigate(
                "/dashboard"
            );

        } catch {

            alert(
                "Login Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center px-6">

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Side */}

                <div className="hidden lg:block text-white">

                    <h1 className="text-6xl font-bold leading-tight">
                        PDF Signature
                        <span className="block text-blue-400">
                            Platform
                        </span>
                    </h1>

                    <p className="mt-6 text-xl text-slate-300">
                        Upload documents, assign signers,
                        collect signatures and finalize PDFs
                        with secure workflow management.
                    </p>

                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Secure Document Signing
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400 text-xl">
                                ✓
                            </span>
                            <span>
                                Multi Participant Workflow
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
                                Email Notifications
                            </span>
                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

                    <div className="text-center mb-8">

                       

                        <h2 className="text-3xl font-bold text-white">
                            Welcome Back
                        </h2>

                        <p className="text-slate-300 mt-2">
                            Sign in to continue
                        </p>

                    </div>

                    <div className="space-y-5">

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={login}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition duration-300"
                        >
                            Login
                        </button>

                    </div>

                    <p className="text-center text-slate-300 mt-8">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-blue-400 ml-2 font-semibold hover:text-blue-300"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}

export default Login;