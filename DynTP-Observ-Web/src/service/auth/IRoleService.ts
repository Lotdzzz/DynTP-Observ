import {ElMessage, ElMessageBox} from "element-plus";
import type {SysRoleDTO} from "../../types/dto/system/SysRoleDTO.ts";

// Check form data and handle role delete messages.
export const IRoleService = {
    async precheck(role: SysRoleDTO): Promise<boolean> {
        const roleName = role.roleName.trim();
        const roleKey = role.roleKey.trim();
        const remark = role.remark.trim();
        if (!roleName) {
            ElMessage.error("请输入角色名称");
            return false;
        }
        if (roleName.length < 2 || roleName.length > 30) {
            ElMessage.error("角色名称长度必须为 2 到 30 个字符");
            return false;
        }
        if (!roleKey) {
            ElMessage.error("请输入权限字符");
            return false;
        }
        if (roleKey.length > 100) {
            ElMessage.error("权限字符不能超过 100 个字符");
            return false;
        }
        if (!Number.isInteger(role.roleSort) || role.roleSort < 0) {
            ElMessage.error("显示顺序必须是大于等于 0 的整数");
            return false;
        }
        if (!["0", "1"].includes(role.status)) {
            ElMessage.error("请选择有效的角色状态");
            return false;
        }
        if (!role.menuIds.length) {
            ElMessage.error("请至少选择一项菜单权限");
            return false;
        }
        if (remark.length > 200) {
            ElMessage.error("备注长度不能超过 200 个字符");
            return false;
        }
        return true;
    },
    // Ask the user before deleting selected roles.
    async beforeDeleteRoles(roleIds: number[]): Promise<boolean> {
        if (!roleIds.length) {
            ElMessage.warning("请先选择要删除的角色");
            return false;
        }
        try {
            await ElMessageBox.confirm(`确定要删除选中的 ${roleIds.length} 个角色吗？`, "批量删除", {
                type: "warning",
                confirmButtonText: "确定删除",
                cancelButtonText: "取消"
            });
            return true;
        } catch (error) {
            if (error === "cancel" || error === "close") return false;
            throw error;
        }
    },
};
