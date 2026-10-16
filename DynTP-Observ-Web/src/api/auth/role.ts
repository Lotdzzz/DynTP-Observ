import type {SysRoleDTO} from "../../types/dto/system/SysRoleDTO.ts";
import type {SysRoleVO} from "../../types/vo/system/SysRoleVO.ts";
import {httpRequest} from "../../utils/http.ts";
import type {PageResult} from "./user.ts";

/** Query values for a role list page. */
export type RolePageQuery = Partial<SysRoleDTO> & {
    pageNum?: number;
    pageSize?: number;
};

/**
 * API methods for role management.
 */
export const roleApi = {
    /** Get one page of roles. */
    list(query: RolePageQuery = {}): Promise<PageResult<SysRoleVO>> {
        return httpRequest.get<PageResult<SysRoleVO>>("/auth/role/list", {params: query});
    },
    /** Get all roles. */
    listAll(): Promise<SysRoleVO[]> {
        return httpRequest.get<SysRoleVO[]>("/auth/role/get/all", {});
    },
    /** Get one role by its ID. */
    getById(roleId: number): Promise<SysRoleVO> {
        return httpRequest.get<SysRoleVO>(`/auth/role/${roleId}`, {});
    },
    /** Create a role. */
    add(role: SysRoleDTO): Promise<void> {
        return httpRequest.post<void, SysRoleDTO>("/auth/role", role);
    },
    /** Update a role. */
    update(role: SysRoleDTO): Promise<void> {
        return httpRequest.put<void, SysRoleDTO>("/auth/role", role);
    },
    /** Delete one role by its ID. */
    delete(roleId: number): Promise<void> {
        return httpRequest.delete<void>(`/auth/role/${roleId}`, {});
    },
    /** Delete several roles by their IDs. */
    batchDelete(roleIds: number[]): Promise<void> {
        return httpRequest.delete<void>("/auth/role/batchDelete", {data: roleIds});
    },
};
