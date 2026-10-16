import type {Ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {menuApi} from "../../api/auth/menu.ts";
import {roleApi} from "../../api/auth/role.ts";
import {IRoleService} from "../../service/auth/IRoleService.ts";
import type {SysRoleVO} from "../../types/vo/system/SysRoleVO.ts";
import {
    additionRole,
    createRoleForm,
    defaultQueryForm,
    menuDataList,
    queryForm,
    roleDataList,
    selectedRoles,
    total,
    updatingRole
} from "./RoleFactory.ts";

// Keep role page actions in one place.
const useRoleManager = (isAddVisible: Ref<boolean>, isUpdateVisible: Ref<boolean>) => {
    async function refreshRoleList(query = defaultQueryForm) {
        const page = await roleApi.list(query);
        roleDataList.value = page.records;
        total.value = page.total;
    }

    // Load menus for the permission tree. The current menu API uses pages.
    async function loadMenus() {
        menuDataList.value = (await menuApi.list({pageNum: 1, pageSize: 1000})).records;
    }

    async function selectRoleList() {
        queryForm.pageNum = 1;
        await refreshRoleList(queryForm);
    }

    // Refresh the current page without changing the page number.
    async function refreshCurrentPage() {
        await refreshRoleList(queryForm);
    }

    async function resetQueryForm() {
        Object.assign(queryForm, defaultQueryForm);
        await selectRoleList();
    }

    function resetAdditionRole() {
        additionRole.value = createRoleForm();
    }

    async function openAddFrame() {
        resetAdditionRole();
        await loadMenus();
        isAddVisible.value = true;
    }

    async function addRole() {
        if (!await IRoleService.precheck(additionRole.value)) return;
        await roleApi.add(additionRole.value);
        await selectRoleList();
        isAddVisible.value = false;
        ElMessage.success("新增成功");
    }

    // Load role details and menu data before opening the edit form.
    async function openUpdateFrame(roleId: number) {
        const [role] = await Promise.all([roleApi.getById(roleId), loadMenus()]);
        updatingRole.value = {...createRoleForm(), ...role, menuIds: (role.menuIds ?? []).map(Number)};
        isUpdateVisible.value = true;
    }

    async function updateRole() {
        if (!await IRoleService.precheck(updatingRole.value)) return;
        await roleApi.update(updatingRole.value);
        await selectRoleList();
        isUpdateVisible.value = false;
        ElMessage.success("修改成功");
    }

    async function deleteRole(role: SysRoleVO) {
        try {
            await ElMessageBox.confirm(`确定要删除角色“${role.roleName}”吗？`, "删除角色", {
                type: "warning",
                confirmButtonText: "确定删除",
                cancelButtonText: "取消"
            });
        } catch (error) {
            if (error === "cancel" || error === "close") return;
            throw error;
        }
        await roleApi.delete(role.roleId);
        await selectRoleList();
        ElMessage.success("删除成功");
    }

    // Save selected rows for batch delete.
    function handleSelectionChange(rows: SysRoleVO[]) {
        selectedRoles.value = rows;
    }

    async function handleBatchDelete() {
        const roleIds = selectedRoles.value.map(role => role.roleId);
        if (!await IRoleService.beforeDeleteRoles(roleIds)) return;
        await roleApi.batchDelete(roleIds);
        selectedRoles.value = [];
        await selectRoleList();
        ElMessage.success("删除成功");
    }

    // Load the selected page with the current search values.
    async function changePage(page: number) {
        queryForm.pageNum = page;
        await refreshRoleList(queryForm);
    }

    return {
        addRole,
        changePage,
        deleteRole,
        handleBatchDelete,
        handleSelectionChange,
        openAddFrame,
        openUpdateFrame,
        refreshRoleList,
        refreshCurrentPage,
        resetAdditionRole,
        resetQueryForm,
        selectRoleList,
        updateRole
    };
};
export {useRoleManager};
