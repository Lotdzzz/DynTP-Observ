import apiRequestConstants from "../../constants/apiRequest.ts";
import type {LoginBodyDTO} from "../../types/dto/login/LoginBodyDTO.ts";
import type {LoginVO} from "../../types/vo/system/LoginVO.ts";
import type {UserInfoVO} from "../../types/vo/system/UserInfoVO.ts";
import type {ValidVO} from "../../types/vo/system/ValidVO.ts";
import {httpRequest} from "../../utils/http.ts";

/**
 * API methods for login and current user data.
 */
export const loginApi = {
    /** Send login data and get the login result. */
    login(loginBody: LoginBodyDTO): Promise<LoginVO> {
        return httpRequest.post<LoginVO>(apiRequestConstants.login, loginBody, {skipAuth: true});
    },
    /** Get information about the current user. */
    getUserInfo(): Promise<UserInfoVO> {
        return httpRequest.get<UserInfoVO>(apiRequestConstants.getUserInfo, {});
    },
    /** End the current user session. */
    logout(): Promise<void> {
        return httpRequest.get<void>(apiRequestConstants.logout, {});
    },
    /** Get the current user's menus and roles. */
    getValid(): Promise<ValidVO> {
        return httpRequest.get<ValidVO>(apiRequestConstants.getValid, {});
    },
};
