import apiRequestConstants from "../../constants/apiRequest.ts";
import type {TokenExistsDTO} from "../../types/dto/login/TokenExistsDTO.ts";
import {httpRequest} from "../../utils/http.ts";

/**
 * API methods for token checks.
 */
export const tokenApi = {
    /** Check whether a token is valid. */
    tokenExists(token: TokenExistsDTO): Promise<boolean> {
        return httpRequest.post<boolean>(apiRequestConstants.tokenExists, token, {skipAuth: true});
    },
};
