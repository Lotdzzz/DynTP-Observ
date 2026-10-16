import {ElMessage, ElMessageBox} from "element-plus";
import {authLogApi} from "../../api/monitor/authLog.ts";
import {IAuthLogService} from "../../service/monitor/IAuthLogService.ts";
import type {SysAuthLogVO} from "../../types/vo/monitor/SysAuthLogVO.ts";
import {authLogDataList, defaultQueryForm, queryForm, selectedAuthLogs, total} from "./AuthLogFactory.ts";

// Keep authentication log actions in one place.
const useAuthLogManager = () => {
    async function refreshAuthLogs() {
        const page = await authLogApi.list(queryForm);
        authLogDataList.value = page.records;
        total.value = page.total;
    }
    async function searchAuthLogs() { queryForm.pageNum = 1; await refreshAuthLogs(); }
    async function resetQueryForm() { Object.assign(queryForm, defaultQueryForm); await refreshAuthLogs(); }
    function handleSelectionChange(rows: SysAuthLogVO[]) { selectedAuthLogs.value = rows; }
    async function deleteAuthLog(log: SysAuthLogVO) {
        try { await ElMessageBox.confirm(`确定要删除账号“${log.username}”的认证日志吗？`, "删除日志", {type: "warning", confirmButtonText: "确定删除", cancelButtonText: "取消"}); }
        catch (error) { if (error === "cancel" || error === "close") return; throw error; }
        await authLogApi.delete(log.id); await refreshAuthLogs(); ElMessage.success("删除成功");
    }
    async function handleBatchDelete() {
        const ids = selectedAuthLogs.value.map(log => log.id);
        if (!await IAuthLogService.beforeDeleteLogs(ids)) return;
        await authLogApi.batchDelete(ids); selectedAuthLogs.value = []; await refreshAuthLogs(); ElMessage.success("删除成功");
    }
    async function getAuthLog(id: number) { return authLogApi.getById(id); }
    return {deleteAuthLog, getAuthLog, handleBatchDelete, handleSelectionChange, refreshAuthLogs, resetQueryForm, searchAuthLogs};
};
export {useAuthLogManager};
