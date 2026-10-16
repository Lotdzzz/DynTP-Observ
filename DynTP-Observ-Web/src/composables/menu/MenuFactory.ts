import {computed, reactive, ref} from "vue";
import type {SysMenuDTO} from "../../types/dto/system/SysMenuDTO.ts";
import type {SysMenuVO} from "../../types/vo/system/SysMenuVO.ts";

// Create a clean menu form for add and reset actions.
const createMenuForm = (): SysMenuDTO => ({
    menuId: 0, menuName: "", parentId: 0, orderNum: 0, path: "", component: "", query: "", routeName: "",
    isFrame: 1, isCache: 0, menuType: "C", visible: "0", status: "0", perms: "", icon: "", remark: "",
});

// Store menu trees and form state used by the menu page.
const menuDataList = ref<SysMenuVO[]>([]);
const allMenuList = ref<SysMenuVO[]>([]);
const selectedMenus = ref<SysMenuVO[]>([]);
const total = ref(0);
const queryForm = reactive({menuName: "", menuType: "", visible: "", status: "", pageNum: 1, pageSize: 10});
const defaultQueryForm = {...queryForm};
const additionMenu = ref<SysMenuDTO>(createMenuForm());
const updatingMenu = ref<SysMenuDTO>(createMenuForm());

// Give the common CRUD frame its page text and row count.
const CRUDFrameProps = computed(() => ({
    title: "菜单管理", tag: "菜单", dataLength: total.value, pageNum: queryForm.pageNum, pageSize: queryForm.pageSize,
    showPagination: false,
}));

export {
    additionMenu,
    allMenuList,
    createMenuForm,
    CRUDFrameProps,
    defaultQueryForm,
    menuDataList,
    queryForm,
    selectedMenus,
    total,
    updatingMenu
};
