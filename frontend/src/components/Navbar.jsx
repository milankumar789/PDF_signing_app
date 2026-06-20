import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate =
        useNavigate();

    const email =
        localStorage.getItem(
            "email"
        );

    const logout =
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "email"
            );

            navigate("/");
        };

    return (

        <nav className="bg-slate-900 border-b border-slate-800 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    {/* Logo */}

                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >

                        <h1 className="text-2xl font-bold text-white">

                            PDF Signature

                        </h1>

                        <p className="text-slate-400 text-sm">

                            Secure Digital Workflow

                        </p>

                    </div>

                    {/* Right Side */}

                    <div className="flex items-center gap-4">

                        <div className="hidden md:block text-right">

                            <p className="text-slate-400 text-xs">
                                Logged In As
                            </p>

                            <p className="text-white text-sm font-medium">
                                {email}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={
                                logout
                            }
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;