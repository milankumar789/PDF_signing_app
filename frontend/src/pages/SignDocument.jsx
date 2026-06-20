import { useParams } from "react-router-dom";

import Editor from "./Editor";

function SignDocument() {

    const { documentId } =
        useParams();

    return (

        <Editor
            key={documentId}
        />

    );
}

export default SignDocument;