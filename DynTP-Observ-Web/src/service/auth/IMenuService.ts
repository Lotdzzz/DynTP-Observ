import {ElMessage, ElMessageBox} from "element-plus";
import type {SysMenuDTO} from "../../types/dto/system/SysMenuDTO.ts";

// Check form data and handle menu delete messages.
export const IMenuService = {
    async precheck(menu: SysMenuDTO): Promise<boolean> {
        if (!menu.menuName.trim()) {
            ElMessage.error("请输入菜单名称");
            return false;
        }
        if (menu.menuName.trim().length > 50) {
            ElMessage.error("菜单名称不能超过 50 个字符");
            return false;
        }
        if (!Number.isInteger(menu.orderNum) || menu.orderNum < 0) {
            ElMessage.error("显示顺序必须是大于等于 0 的整数");
            return false;
        }
        if (!['M', 'C', 'F'].includes(menu.menuType)) {
            ElMessage.error("请选择有效的菜单类型");
            return false;
        }
        if (menu.menuType !== 'F' && !menu.path.trim()) {
            ElMessage.error("请输入路由地址");
            return false;
        }
        if (menu.menuType === 'C' && !menu.component.trim()) {
            ElMessage.error("请输入组件路径");
            return false;
        }
        if (menu.menuType === 'F' && !menu.perms.trim()) {
            ElMessage.error("请输入权限标识");
            return false;
        }
        if (!['0', '1'].includes(menu.visible) || !['0', '1'].includes(menu.status)) {
            ElMessage.error("请选择有效的菜单状态");
            return false;
        }
        if (menu.remark.trim().length > 200) {
            ElMessage.error("备注长度不能超过 200 个字符");
            return false;
        }
        return true;
    },
    // Ask the user before deleting selected menus.
    async beforeDeleteMenus(menuIds: number[]): Promise<boolean> {
        if (!menuIds.length) {
            ElMessage.warning("请先选择要删除的菜单");
            return false;
        }
        try {
            await ElMessageBox.confirm(`确定要删除选中的 ${menuIds.length} 个菜单吗？`, "批量删除", {
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
