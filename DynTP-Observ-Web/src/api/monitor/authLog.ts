import {httpRequest} from "../../utils/http.ts";
import type {PageResult} from "../auth/user.ts";
import type {SysAuthLogDTO} from "../../types/dto/monitor/SysAuthLogDTO.ts";
import type {SysAuthLogVO} from "../../types/vo/monitor/SysAuthLogVO.ts";

export type AuthLogPageQuery = Partial<SysAuthLogDTO> & {pageNum?: number; pageSize?: number};

// API methods for authentication log monitoring.
export const authLogApi = {
    list(query: AuthLogPageQuery): Promise<PageResult<SysAuthLogVO>> {
        return httpRequest.get<PageResult<SysAuthLogVO>>("/certification/monitor/authLog/list", {params: query});
    },
    getById(id: number): Promise<SysAuthLogVO> {
        return httpRequest.get<SysAuthLogVO>(`/certification/monitor/authLog/${id}`, {});
    },
    delete(id: number): Promise<void> {
        return httpRequest.delete<void>(`/certification/monitor/authLog/${id}`, {});
    },
    batchDelete(ids: number[]): Promise<void> {
        return httpRequest.delete<void>("/certification/monitor/authLog/batchDelete", {data: ids});
    },
};
