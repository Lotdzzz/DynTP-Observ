import type {Ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {menuApi} from "../../api/auth/menu.ts";
import {IMenuService} from "../../service/auth/IMenuService.ts";
import type {SysMenuVO} from "../../types/vo/system/SysMenuVO.ts";
import {
    additionMenu,
    allMenuList,
    createMenuForm,
    defaultQueryForm,
    menuDataList,
    queryForm,
    selectedMenus,
    total,
    updatingMenu
} from "./MenuFactory.ts";

// Keep menu page actions in one place.
const useMenuManager = (isAddVisible: Ref<boolean>, isUpdateVisible: Ref<boolean>) => {
    async function loadAllMenus() {
        allMenuList.value = await menuApi.listTree();
    }

    async function refreshMenuList(query = defaultQueryForm) {
        menuDataList.value = await menuApi.listTree(query);
        total.value = countMenuNodes(menuDataList.value);
    }

    // Count descendants because only root nodes are rendered in the tree table.
    function countMenuNodes(menus: SysMenuVO[]): number {
        return menus.reduce((count, menu) => count + 1 + countMenuNodes(menu.children ?? []), 0);
    }

    async function selectMenuList() {
        queryForm.pageNum = 1;
        await refreshMenuList(queryForm);
    }

    // Refresh the current page without changing the page number.
    async function refreshCurrentPage() {
        await refreshMenuList(queryForm);
    }

    async function resetQueryForm() {
        Object.assign(queryForm, defaultQueryForm);
        await selectMenuList();
    }

    function resetAdditionMenu() {
        additionMenu.value = createMenuForm();
    }

    async function openAddFrame() {
        resetAdditionMenu();
        await loadAllMenus();
        isAddVisible.value = true;
    }

    async function addMenu() {
        if (!await IMenuService.precheck(additionMenu.value)) return;
        await menuApi.add(additionMenu.value);
        await Promise.all([selectMenuList(), loadAllMenus()]);
        isAddVisible.value = false;
        ElMessage.success("新增成功");
    }

    // Load menu details and parent options before opening the edit form.
    async function openUpdateFrame(menuId: number) {
        const [menu] = await Promise.all([menuApi.getById(menuId), loadAllMenus()]);
        updatingMenu.value = {...createMenuForm(), ...menu};
        isUpdateVisible.value = true;
    }

    async function updateMenu() {
        if (!await IMenuService.precheck(updatingMenu.value)) return;
        await menuApi.update(updatingMenu.value);
        await Promise.all([selectMenuList(), loadAllMenus()]);
        isUpdateVisible.value = false;
        ElMessage.success("修改成功");
    }

    async function deleteMenu(menu: SysMenuVO) {
        try {
            await ElMessageBox.confirm(`确定要删除菜单“${menu.menuName}”吗？`, "删除菜单", {
                type: "warning",
                confirmButtonText: "确定删除",
                cancelButtonText: "取消"
            });
        } catch (error) {
            if (error === "cancel" || error === "close") return;
            throw error;
        }
        await menuApi.delete(menu.menuId);
        await Promise.all([selectMenuList(), loadAllMenus()]);
        ElMessage.success("删除成功");
    }

    // Save selected rows for batch delete.
    function handleSelectionChange(rows: SysMenuVO[]) {
        selectedMenus.value = rows;
    }

    async function handleBatchDelete() {
        const menuIds = selectedMenus.value.map(menu => menu.menuId);
        if (!await IMenuService.beforeDeleteMenus(menuIds)) return;
        await menuApi.batchDelete(menuIds);
        selectedMenus.value = [];
        await Promise.all([selectMenuList(), loadAllMenus()]);
        ElMessage.success("删除成功");
    }

    return {
        addMenu,
        deleteMenu,
        handleBatchDelete,
        handleSelectionChange,
        openAddFrame,
        openUpdateFrame,
        refreshMenuList,
        refreshCurrentPage,
        resetAdditionMenu,
        resetQueryForm,
        selectMenuList,
        updateMenu
    };
};
export {useMenuManager};
