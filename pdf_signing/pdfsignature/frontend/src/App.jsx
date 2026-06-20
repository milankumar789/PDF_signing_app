import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Participants from "./pages/Participants";
import SignDocument from "./pages/SignDocument";
import SignerPortal from "./pages/SignerPortal";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

                <Route
    path="/editor/:documentId"
    element={
        <ProtectedRoute>
            <Editor />
        </ProtectedRoute>
    }
/>

     <Route
    path="/participants/:documentId"
    element={
        <ProtectedRoute>
            <Participants />
        </ProtectedRoute>
    }
/>           

                
           <Route
    path="/sign/:documentId/:role"
    element={
        <ProtectedRoute>
            <SignerPortal />
        </ProtectedRoute>
    }
/>    
            </Routes>

        </BrowserRouter>
    );
}

export default App;