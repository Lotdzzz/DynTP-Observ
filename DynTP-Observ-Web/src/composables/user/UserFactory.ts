/**
 * the state management for ref or reactive of page
 */
// define the query form reactive object
import {computed, reactive, ref} from "vue";
import type {SysUserVO} from "../../types/vo/system/SysUserVO.ts";
import type {SysUserDTO} from "../../types/dto/system/SysUserDTO.ts";
import type {SysRoleVO} from "../../types/vo/system/SysRoleVO.ts";

// define userData list
const userDataList = ref<SysUserVO[]>();
const total = ref(0);

// Track the rows selected in the user table for batch operations.
const selectedUsers = ref<SysUserVO[]>([]);

const queryForm = reactive({
    userName: "",
    nickName: "",
    status: "",
    pageNum: 1,
    pageSize: 10,
})

// define the default query form object
const defaultQueryForm = reactive({
    userName: "",
    nickName: "",
    status: "",
    pageNum: 1,
    pageSize: 10,
})

// user owner information
const additionUser = ref<SysUserDTO>({
    password: "",
    roleIds: [],
    userId: 0,
    userName: "",
    nickName: "",
    email: "",
    avatar: "",
    status: "0",
    remark: ""
})

// user update information
const updatingUser = ref<SysUserDTO>({
    password: "",
    roleIds: [],
    userId: 0,
    userName: "",
    nickName: "",
    email: "",
    avatar: "",
    status: "0",
    remark: ""
})

// Define role list for the user add and update forms.
const roleList = ref<SysRoleVO[]>([]);

// Define the props used by the CRUD frame.
const CRUDFrameProps = computed(() => ({
    title: "用户管理",
    tag: "用户",
    dataLength: total.value,
    pageNum: queryForm.pageNum,
    pageSize: queryForm.pageSize,
}));

export {
    queryForm,
    defaultQueryForm,
    userDataList,
    total,
    selectedUsers,
    additionUser,
    updatingUser,
    roleList,
    CRUDFrameProps,
}
