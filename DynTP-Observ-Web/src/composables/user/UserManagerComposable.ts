import type {Ref} from "vue";
import {ElMessage} from "element-plus";
import {roleApi} from "../../api/auth/role.ts";
import {userApi} from "../../api/auth/user.ts";
import {IUserService} from "../../service/auth/IUserService.ts";
import type {SysUserVO} from "../../types/vo/system/SysUserVO.ts";
import {
    additionUser,
    defaultQueryForm,
    queryForm,
    roleList,
    selectedUsers,
    total,
    updatingUser,
    userDataList,
} from "./UserFactory.ts";

/**
 * Provide all user page actions.
 * The page keeps only the dialog visibility state.
 */
const useUserManager = (isVisible: Ref<boolean>, isUpdateFrameVisible: Ref<boolean>) => {
    const resetAdditionUser = () => {
        additionUser.value = {
            password: "", roleIds: [], userId: 0, userName: "", nickName: "",
            email: "", avatar: "", status: "0", remark: "",
        };
    };

    /** Get the user list and update shared page data. */
    async function refreshUserDataList(query = defaultQueryForm) {
        const page = await userApi.list(query);
        userDataList.value = page.records;
        total.value = page.total;
    }

    /** Get the default user list. */
    async function userData() {
        await refreshUserDataList();
    }

    /** Search users with the current query values. */
    async function selectUserList() {
        queryForm.pageNum = 1;
        await refreshUserDataList(queryForm);
    }

    /** Refresh the current page without changing the page number. */
    async function refreshCurrentPage() {
        await refreshUserDataList(queryForm);
    }

    /** Restore default query values and run the search again. */
    async function resetQueryForm() {
        Object.assign(queryForm, defaultQueryForm);
        await selectUserList();
    }

    /** Check and create a user. */
    async function addUser(user: Parameters<typeof userApi.add>[0]) {
        const isUserValid = await IUserService.precheck(user);
        if (!isUserValid) return;

        const result = await userApi.add(user);
        await refreshUserDataList(queryForm);
        isVisible.value = false;
        return result;
    }

    /** Get all roles for the role selector. */
    async function fetchRoleList() {
        roleList.value = await roleApi.listAll();
    }

    /** Update a user. */
    async function updateUser(user: Parameters<typeof userApi.update>[0]) {
        const result = await userApi.update(user);
        await refreshUserDataList(queryForm);
        isUpdateFrameVisible.value = false;
        return result;
    }

    /** Delete one user and refresh the list. */
    async function deleteUser(userId: number) {
        const result = await userApi.delete(userId);
        await refreshUserDataList(queryForm);
        return result;
    }

    // Load the selected page with the current search values.
    async function changePage(page: number) {
        queryForm.pageNum = page;
        await refreshUserDataList(queryForm);
    }

    /** Delete several users and refresh the list. */
    async function batchDeleteUsers(userIds: number[]) {
        const result = await userApi.batchDelete(userIds);
        await refreshUserDataList(queryForm);
        return result;
    }

    /** Save the selected table rows. */
    function handleSelectionChange(rows: SysUserVO[]) {
        selectedUsers.value = rows;
    }

    /** Ask for confirmation before deleting selected users. */
    async function handleBatchDelete() {
        const userIds = selectedUsers.value.map(user => user.userId);
        const confirm = await IUserService.beforeDeleteUser(userIds)
        if (!confirm) return;
        await batchDeleteUsers(userIds);
        selectedUsers.value = [];
        ElMessage.success("删除成功");
    }

    /** Load a user into the update form and open the dialog. */
    async function openUpdateFrame(userId: number) {
        const user = await userApi.getById(userId);
        updatingUser.value.nickName = user.nickName;
        updatingUser.value.userName = user.userName;
        updatingUser.value.email = user.email;
        updatingUser.value.avatar = user.avatar;
        updatingUser.value.status = user.status;
        updatingUser.value.remark = user.remark;
        updatingUser.value.userId = user.userId;
        updatingUser.value.roleIds = user.roleIds;

        // fetch role list for the update form
        await fetchRoleList();
        console.log(user)

        Object.assign(updatingUser.value, {
            ...user,
            // 将已有角色 ID 转为数字数组
            password: "",
            roleIds: (user.roleIds ?? []).map(Number),
        });

        isUpdateFrameVisible.value = true;
    }

    return {
        userData, selectUserList, refreshCurrentPage, resetQueryForm, addUser, fetchRoleList, updateUser,
        deleteUser, handleSelectionChange, handleBatchDelete, openUpdateFrame, changePage,
        resetAdditionUser,
    };
};

export {useUserManager}
