import type {SysUserDTO} from "../../types/dto/system/SysUserDTO.ts";
import type {SysUserVO} from "../../types/vo/system/SysUserVO.ts";
import {httpRequest} from "../../utils/http.ts";

/** A page of data returned by the server. */
export interface PageResult<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}

/** Query values for a user list page. */
export type UserPageQuery = Partial<SysUserDTO> & {
    pageNum?: number;
    pageSize?: number;
};

/**
 * API methods for user management.
 */
export const userApi = {
    /** Get one page of users. */
    list(query: UserPageQuery = {}): Promise<PageResult<SysUserVO>> {
        return httpRequest.get<PageResult<SysUserVO>>("/auth/user/list", {params: query});
    },
    /** Get one user by its ID. */
    getById(userId: number): Promise<SysUserVO> {
        return httpRequest.get<SysUserVO>(`/auth/user/${userId}`, {});
    },
    /** Create a user. */
    add(user: SysUserDTO): Promise<void> {
        return httpRequest.post<void, SysUserDTO>("/auth/user", user);
    },
    /** Update a user. */
    update(user: SysUserDTO): Promise<void> {
        return httpRequest.put<void, SysUserDTO>("/auth/user", user);
    },
    /** Delete one user by its ID. */
    delete(userId: number): Promise<void> {
        return httpRequest.delete<void>(`/auth/user/${userId}`, {});
    },
    /** Delete several users by their IDs. */
    batchDelete(userIds: number[]): Promise<void> {
        return httpRequest.delete<void>("/auth/user/batchDelete", {data: userIds});
    },
    /** Update a user when the current user owns that account. */
    updateByOwner(user: SysUserDTO): Promise<void> {
        return httpRequest.put<void, SysUserDTO>("/auth/user/updateByOwner", user);
    },
    /** Get a user when the current user owns that account. */
    getByOwner(userId: number): Promise<SysUserVO> {
        return httpRequest.get<SysUserVO>(`/auth/user/getByOwner/${userId}`, {});
    },
};
