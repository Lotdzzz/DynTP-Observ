import {computed, reactive, ref} from "vue";
import type {SysMenuVO} from "../../types/vo/system/SysMenuVO.ts";
import type {SysRoleDTO} from "../../types/dto/system/SysRoleDTO.ts";
import type {SysRoleVO} from "../../types/vo/system/SysRoleVO.ts";

// Create a clean role form for add and reset actions.
const createRoleForm = (): SysRoleDTO => ({
    roleId: 0, roleName: "", roleKey: "", roleSort: 0, dataScope: "1",
    menuCheckStrictly: 0, deptCheckStrictly: 0, status: "0", remark: "", menuIds: [],
});

// Store data used by the role page.
const roleDataList = ref<SysRoleVO[]>([]);
const total = ref(0);
const selectedRoles = ref<SysRoleVO[]>([]);
const menuDataList = ref<SysMenuVO[]>([]);
const queryForm = reactive({roleName: "", roleKey: "", status: "", pageNum: 1, pageSize: 10});
const defaultQueryForm = {...queryForm};
const additionRole = ref<SysRoleDTO>(createRoleForm());
const updatingRole = ref<SysRoleDTO>(createRoleForm());
// Give the common CRUD frame its page text and row count.
const CRUDFrameProps = computed(() => ({
    title: "角色管理", tag: "角色", dataLength: total.value, pageNum: queryForm.pageNum, pageSize: queryForm.pageSize,
}));

export {
    additionRole,
    createRoleForm,
    CRUDFrameProps,
    defaultQueryForm,
    menuDataList,
    queryForm,
    roleDataList,
    selectedRoles,
    total,
    updatingRole
};
