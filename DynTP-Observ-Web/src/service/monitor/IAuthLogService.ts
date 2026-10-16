import {ElMessage, ElMessageBox} from "element-plus";

// Handle delete messages for authentication logs.
export const IAuthLogService = {
    async beforeDeleteLogs(ids: number[]): Promise<boolean> {
        if (!ids.length) { ElMessage.warning("请先选择要删除的日志"); return false; }
        try {
            await ElMessageBox.confirm(`确定要删除选中的 ${ids.length} 条认证日志吗？`, "批量删除", {type: "warning", confirmButtonText: "确定删除", cancelButtonText: "取消"});
            return true;
        } catch (error) {
            if (error === "cancel" || error === "close") return false;
            throw error;
        }
    },
};
