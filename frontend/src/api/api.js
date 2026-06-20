import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const createField =
    async (fieldData) => {

        const response =
            await api.post(
                "/api/fields",
                fieldData
            );

        return response.data;
    };

export const deleteField =
    async (fieldId) => {

        const response =
            await api.delete(
                `/api/fields/${fieldId}`
            );

        return response.data;
    };

export const getFields =
    async (documentId) => {

        const response =
            await api.get(
                `/api/fields/document/${documentId}`
            );

        return response.data;
    };

export const updateFieldPosition =
    async (
        fieldId,
        x,
        y
    ) => {

        const response =
            await api.put(
                `/api/fields/${fieldId}/position`,
                {
                    x,
                    y
                }
            );

        return response.data;
    };

export const updateFieldSize =
    async (
        fieldId,
        width,
        height
    ) => {

        const response =
            await api.put(
                `/api/fields/${fieldId}/size`,
                {
                    width,
                    height
                }
            );

        return response.data;
    };

export const addParticipant =
    async (
        documentId,
        email,
        role
    ) => {

        const response =
            await api.post(
                "/api/workflow/participants",
                {
                    documentId,
                    email,
                    role
                }
            );

        return response.data;
    };

export const getParticipants =
    async (documentId) => {

        const response =
            await api.get(
                `/api/workflow/participants/${documentId}`
            );

        return response.data;
    };

export const deleteParticipant =
    async (participantId) => {

        const response =
            await api.delete(
                `/api/workflow/participants/${participantId}`
            );

        return response.data;
    };

export const startWorkflow =
    async (documentId) => {

        const response =
            await api.post(
                `/api/workflow/${documentId}/start`
            );

        return response.data;
    };

export const createSignature =
    async (
        fieldId,
        participantEmail,
        signatureType,
        imagePath
    ) => {

        const response =
            await api.post(
                "/api/signatures",
                {
                    fieldId,
                    participantEmail,
                    signatureType,
                    imagePath
                }
            );

        return response.data;
    };

export const getSignatures =
    async (fieldId) => {

        const response =
            await api.get(
                `/api/signatures/field/${fieldId}`
            );

        return response.data;
    };

export const finalizeDocument =
    async (documentId) => {

        const response =
            await api.post(
                `/api/docs/${documentId}/finalize`
            );

        return response.data;
    };

export const getAuditLogs =
    async (documentId) => {

        const response =
            await api.get(
                `/api/audit/${documentId}`
            );

        return response.data;
    };

export default api;