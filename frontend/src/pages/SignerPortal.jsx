import {
    useParams,
    useSearchParams
} from "react-router-dom";

import PdfViewer from "../components/PdfViewer";

function SignerPortal() {

    const {
        documentId,
        role
    } = useParams();

    const [searchParams] =
        useSearchParams();

    const signerEmail =
        searchParams.get(
            "email"
        );

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h1>
                Sign Document
            </h1>

            <p>
                Document ID:
                {" "}
                {documentId}
            </p>

            <p>
                Role:
                {" "}
                {role}
            </p>

            <p>
                Email:
                {" "}
                {signerEmail}
            </p>

            <PdfViewer
                documentId={
                    documentId
                }
                signerMode={
                    true
                }
                signerRole={
                    role
                }
                signerEmail={
                    signerEmail
                }
            />

        </div>

    );
}

export default SignerPortal;