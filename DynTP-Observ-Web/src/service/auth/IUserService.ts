import {ElMessage, ElMessageBox} from "element-plus";
import type {SysUserDTO} from "../../types/dto/system/SysUserDTO.ts";

/**
 * User business service.
 */
export const IUserService = {
    /**
     * precheck user information before add or update
     * @param user user information to be checked
     * @returns true if the user information is valid, false otherwise
     */
    async precheck(user: SysUserDTO): Promise<boolean> {
        const userName = user.userName?.trim() ?? "";
        const password = user.password?.trim() ?? "";
        const email = user.email?.trim() ?? "";
        const remark = user.remark?.trim() ?? "";
        const nickName = user.nickName?.trim() ?? "";

        if (!userName || userName.length === 0) {
            ElMessage.error("请输入用户名");
            return false;
        }

        if (userName.length < 2 || userName.length > 20) {
            ElMessage.error("用户名长度必须为2到20个字符");
            return false;
        }

        if (nickName.length < 2 || nickName.length > 20) {
            ElMessage.error("昵称长度必须为2到20个字符");
            return false;
        }

        if (password.length === 0 || (password.length < 5 || password.length > 20)) {
            ElMessage.error("密码长度必须为5到20个字符");
            return false;
        }

        if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            ElMessage.error("请输入正确的邮箱地址");
            return false;
        }

        if (user.status !== "0" && user.status !== "1") {
            ElMessage.error("请选择有效的账号状态");
            return false;
        }

        if (remark.length > 200) {
            ElMessage.error("备注长度不能超过200个字符");
            return false;
        }

        return true;
    },
    /**
     * before deleting user, ask for confirmation
     */
    async beforeDeleteUser(userIds: number[]): Promise<boolean> {
        if (userIds.length === 0) {
            ElMessage.warning("请先选择要删除的用户");
            return false;
        }

        try {
            await ElMessageBox.confirm(`确定要删除选中的 ${userIds.length} 个用户吗？`, "批量删除", {
                type: "warning", confirmButtonText: "确定删除", cancelButtonText: "取消",
            });
        } catch (error) {
            if (error === "cancel" || error === "close") return false;
            throw error;
        }
        return true;
    }
};
