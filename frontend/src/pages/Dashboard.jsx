import Navbar from "../components/Navbar";
import UploadDocument from "../components/UploadDocument";
import DocumentList from "../components/DocumentList";

function Dashboard() {

    const email =
        localStorage.getItem(
            "email"
        );

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Hero Section */}

                <div className="bg-linear-to-r from-blue-700 to-indigo-800 rounded-3xl p-10 text-white shadow-xl mb-8">

                    <h1 className="text-4xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-3 text-blue-100 text-lg">
                        {email}
                    </p>

                    <p className="mt-4 text-blue-100 max-w-2xl">
                        Upload PDFs, manage participants,
                        collect signatures and finalize
                        documents securely from a single
                        platform.
                    </p>

                </div>

                {/* Upload Area */}

                <UploadDocument />

                {/* Documents */}

                <DocumentList />

            </div>

        </div>

    );
}

export default Dashboard;