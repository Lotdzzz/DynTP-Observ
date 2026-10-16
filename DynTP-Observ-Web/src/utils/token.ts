import {tokenConstants} from "../constants/tokenConstants.ts";
import {tokenApi} from "../api/system/token.ts";
import type {TokenExistsDTO} from "../types/dto/login/TokenExistsDTO.ts";

/**
 * 管理当前登录用户的访问令牌。
 */
const tokenUtils = {
    get(): string | null {
        const exist = localStorage.getItem(tokenConstants.TOKEN_STORAGE_KEY);
        if (!exist) {
            return null
        }

        // judge expiry time
        const expiryTime = localStorage.getItem(tokenConstants.TOKEN_EXPIRY_TIME_KEY);
        if (!expiryTime || Date.now() > Number(expiryTime)) {
            this.remove();
            return null;
        }

        return exist;
    },
    set(token: string): void {
        // set token
        localStorage.setItem(tokenConstants.TOKEN_STORAGE_KEY, token);
        // set expiry time
        localStorage.setItem(tokenConstants.TOKEN_EXPIRY_TIME_KEY, String(Date.now() + tokenConstants.TOKEN_EXPIRY_TIME));
    },
    remove(): void {
        localStorage.removeItem(tokenConstants.TOKEN_STORAGE_KEY);
        localStorage.removeItem(tokenConstants.TOKEN_EXPIRY_TIME_KEY);
    },
    async exists(): Promise<boolean> {
        const token = this.get();
        if (token === null || token.trim() === "") {
            return false;
        }

        // judge token exists from server
        const tokenExistsDTO: TokenExistsDTO = {token: token};
        const exists = await tokenApi.tokenExists(tokenExistsDTO);
        if (!exists) {
            this.remove();
            return false;
        }
        return true;
    },
};

export default tokenUtils;
