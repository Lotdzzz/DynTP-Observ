import type {SysMenuDTO} from "../../types/dto/system/SysMenuDTO.ts";
import type {SysMenuVO} from "../../types/vo/system/SysMenuVO.ts";
import {httpRequest} from "../../utils/http.ts";
import type {PageResult} from "./user.ts";

/** Query values for a menu list page. */
export type MenuPageQuery = Partial<SysMenuDTO> & {
    pageNum?: number;
    pageSize?: number;
};

/**
 * API methods for menu management.
 */
export const menuApi = {
    /** Get one page of menus. */
    list(query: MenuPageQuery = {}): Promise<PageResult<SysMenuVO>> {
        return httpRequest.get<PageResult<SysMenuVO>>("/auth/menu/list", {params: query});
    },
    /** Get all matching menus as an ordered tree. */
    listTree(query: MenuPageQuery = {}): Promise<SysMenuVO[]> {
        return httpRequest.get<SysMenuVO[]>("/auth/menu/tree", {params: query});
    },
    /** Get one menu by its ID. */
    getById(menuId: number): Promise<SysMenuVO> {
        return httpRequest.get<SysMenuVO>(`/auth/menu/${menuId}`, {});
    },
    /** Create a menu. */
    add(menu: SysMenuDTO): Promise<void> {
        return httpRequest.post<void, SysMenuDTO>("/auth/menu", menu);
    },
    /** Update a menu. */
    update(menu: SysMenuDTO): Promise<void> {
        return httpRequest.put<void, SysMenuDTO>("/auth/menu", menu);
    },
    /** Delete one menu by its ID. */
    delete(menuId: number): Promise<void> {
        return httpRequest.delete<void>(`/auth/menu/${menuId}`, {});
    },
    /** Delete several menus by their IDs. */
    batchDelete(menuIds: number[]): Promise<void> {
        return httpRequest.delete<void>("/auth/menu/batchDelete", {data: menuIds});
    },
};
