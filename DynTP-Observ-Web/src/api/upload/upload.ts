import {httpRequest} from "../../utils/http.ts";

/**
 * API methods for file upload.
 */
export const uploadApi = {
    /** Upload a file and return its saved path. */
    upload(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        return httpRequest.post<string, FormData>("/upload", formData);
    },
};
