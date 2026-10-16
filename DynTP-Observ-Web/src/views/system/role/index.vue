<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import CRUDAddForm from "../../../components/CRUDAddForm.vue";
import CRUDFrame from "../../../components/CRUDFrame.vue";
import CRUDUpdateForm from "../../../components/CRUDUpdateForm.vue";
import {useRoleManager} from "../../../composables/role/RoleManagerComposable.ts";
import {
  additionRole,
  CRUDFrameProps,
  menuDataList,
  queryForm,
  roleDataList,
  updatingRole
} from "../../../composables/role/RoleFactory.ts";
import type {SysMenuVO} from "../../../types/vo/system/SysMenuVO.ts";

// Control the add and edit dialogs.
const isAddVisible = ref(false);
const isUpdateVisible = ref(false);
const addTreeVersion = ref(0);
const roleManager = useRoleManager(isAddVisible, isUpdateVisible);

// Change the flat menu list into data that the tree can show.
type MenuTreeNode = SysMenuVO & { children?: MenuTreeNode[] };
const menuTree = computed<MenuTreeNode[]>(() => {
  const nodes = new Map<number, MenuTreeNode>();
  const roots: MenuTreeNode[] = [];
  menuDataList.value.forEach(menu => nodes.set(menu.menuId, {...menu, children: []}));
  nodes.forEach(node => {
    if (node.parentId && nodes.has(node.parentId)) nodes.get(node.parentId)!.children!.push(node);
    else roots.push(node);
  });
  return roots;
});

// Save checked menu IDs in the current role form.
function updateMenuIds(role: typeof additionRole.value, keys: Array<string | number>) {
  role.menuIds = keys.map(Number);
}

function handleAdditionTreeCheck(_: unknown, checked: { checkedKeys: Array<string | number> }) {
  updateMenuIds(additionRole.value, checked.checkedKeys);
}

function handleUpdatingTreeCheck(_: unknown, checked: { checkedKeys: Array<string | number> }) {
  updateMenuIds(updatingRole.value, checked.checkedKeys);
}

// Reset both the add form and its tree view.
function resetAdditionRole() {
  roleManager.resetAdditionRole();
  addTreeVersion.value += 1;
}

// Load the first role list when this page opens.
onMounted(() => roleManager.refreshRoleList());
</script>

<template>
  <CRUDUpdateForm v-model:isVisible="isUpdateVisible" @submit="roleManager.updateRole">
    <template #table>
      <el-form class="role-form" label-position="top">
        <div class="form-section-title"><span class="section-icon">◆</span>
          <div><strong>基本信息</strong><small>修改角色标识与数据范围</small></div>
        </div>
        <div class="form-grid">
          <el-form-item label="角色名称" required>
            <el-input v-model="updatingRole.roleName" placeholder="请输入角色名称" clearable/>
          </el-form-item>
          <el-form-item label="权限字符" required>
            <el-input v-model="updatingRole.roleKey" placeholder="例如 system:operator" clearable/>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="updatingRole.roleSort" :min="0" controls-position="right" class="full-width"/>
          </el-form-item>
          <el-form-item label="角色状态">
            <el-select v-model="updatingRole.status" class="full-width">
              <el-option label="启用" value="0"/>
              <el-option label="停用" value="1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单父子联动">
            <el-switch v-model="updatingRole.menuCheckStrictly" :active-value="0" :inactive-value="1" active-text="联动"
                       inactive-text="独立"/>
          </el-form-item>
        </div>
        <div class="form-section-title form-section-title--secondary"><span class="section-icon">◆</span>
          <div><strong>菜单权限</strong><small>勾选此角色可访问的目录、菜单或按钮</small></div>
        </div>
        <el-tree :key="`update-${isUpdateVisible}-${updatingRole.roleId}`" class="menu-tree" :data="menuTree"
                 node-key="menuId" show-checkbox check-on-click-node :default-checked-keys="updatingRole.menuIds"
                 :check-strictly="updatingRole.menuCheckStrictly === 1"
                 :props="{label: 'menuName', children: 'children'}" @check="handleUpdatingTreeCheck"/>
        <el-form-item label="备注" class="remark-item">
          <el-input v-model="updatingRole.remark" type="textarea" :rows="3" maxlength="200" show-word-limit
                    placeholder="请输入备注信息"/>
        </el-form-item>
      </el-form>
    </template>
  </CRUDUpdateForm>

  <CRUDAddForm v-model:isVisible="isAddVisible" @submit="roleManager.addRole" @reset-add="resetAdditionRole">
    <template #table>
      <el-form class="role-form" label-position="top">
        <div class="form-section-title"><span class="section-icon">◆</span>
          <div><strong>基本信息</strong><small>填写角色标识与数据范围</small></div>
        </div>
        <div class="form-grid">
          <el-form-item label="角色名称" required>
            <el-input v-model="additionRole.roleName" placeholder="请输入角色名称" clearable/>
          </el-form-item>
          <el-form-item label="权限字符" required>
            <el-input v-model="additionRole.roleKey" placeholder="例如 system:operator" clearable/>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="additionRole.roleSort" :min="0" controls-position="right" class="full-width"/>
          </el-form-item>
          <el-form-item label="角色状态">
            <el-select v-model="additionRole.status" class="full-width">
              <el-option label="启用" value="0"/>
              <el-option label="停用" value="1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单父子联动">
            <el-switch v-model="additionRole.menuCheckStrictly" :active-value="0" :inactive-value="1" active-text="联动"
                       inactive-text="独立"/>
          </el-form-item>
        </div>
        <div class="form-section-title form-section-title--secondary"><span class="section-icon">◆</span>
          <div><strong>菜单权限</strong><small>勾选此角色可访问的目录、菜单或按钮</small></div>
        </div>
        <el-tree :key="`add-${isAddVisible}-${addTreeVersion}`" class="menu-tree" :data="menuTree" node-key="menuId"
                 show-checkbox check-on-click-node :default-checked-keys="additionRole.menuIds"
                 :check-strictly="additionRole.menuCheckStrictly === 1"
                 :props="{label: 'menuName', children: 'children'}" @check="handleAdditionTreeCheck"/>
        <el-form-item label="备注" class="remark-item">
          <el-input v-model="additionRole.remark" type="textarea" :rows="3" maxlength="200" show-word-limit
                    placeholder="请输入备注信息"/>
        </el-form-item>
      </el-form>
    </template>
  </CRUDAddForm>

  <CRUDFrame :CRUDFrameProps="CRUDFrameProps" @search="roleManager.selectRoleList" @reset="roleManager.resetQueryForm"
             @refresh="roleManager.refreshCurrentPage" @batch-delete="roleManager.handleBatchDelete"
             @create="roleManager.openAddFrame" @page-change="roleManager.changePage">
    <template #search>
      <el-form class="filter-form" inline>
        <el-form-item label="角色名称">
          <el-input v-model="queryForm.roleName" class="role-name-input" clearable placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="queryForm.roleKey" class="role-key-input" clearable placeholder="请输入权限字符"/>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="queryForm.status" class="status-select" clearable placeholder="全部状态">
            <el-option label="启用" value="0"/>
            <el-option label="停用" value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #data>
      <el-table class="user-table" :data="roleDataList" height="calc(100vh - 310px)" stripe empty-text="暂无数据"
                @selection-change="roleManager.handleSelectionChange">
        <el-table-column type="selection" width="52" align="center"/>
        <el-table-column prop="roleName" label="角色名称" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="roleKey" label="权限字符" min-width="190" show-overflow-tooltip>
          <template #default="{row}">
            <el-tag effect="plain" class="role-key-tag">{{ row.roleKey }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roleSort" label="排序" width="82" align="center"/>
        <el-table-column label="状态" width="100">
          <template #default="{row}">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" effect="light" size="small">
              {{ row.status === '0' ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间" min-width="180"/>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="roleManager.openUpdateFrame(row.roleId)">编辑
            </el-button>
            <el-button link type="danger" size="small" @click="roleManager.deleteRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </CRUDFrame>
</template>

<style scoped>
.role-name-input, .role-key-input {
  width: 180px;
}

.status-select {
  width: 140px;
}

.role-form {
  padding: 4px 2px;
}

.form-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 2px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8f0f8;
}

.form-section-title--secondary {
  margin-top: 12px;
}

.section-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 7px;
  color: #4c8bd4;
  background: #eaf4ff;
  font-size: 9px;
}

.form-section-title strong, .form-section-title small {
  display: block;
}

.form-section-title strong {
  color: #304b6d;
  font-size: 13px;
}

.form-section-title small {
  margin-top: 2px;
  color: #9aabbe;
  font-size: 11px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 18px;
}

.role-form :deep(.el-form-item) {
  margin-bottom: 17px;
}

.role-form :deep(.el-form-item__label) {
  padding-bottom: 6px;
  color: #617893;
  font-size: 12px;
  font-weight: 600;
}

.role-form :deep(.el-input__wrapper), .role-form :deep(.el-input-number), .role-form :deep(.el-select__wrapper), .role-form :deep(.el-textarea__inner) {
  border: 1px solid #d8e6f4;
  border-radius: 9px;
  background: #fbfdff;
  box-shadow: 0 2px 6px rgba(63, 111, 160, .04);
}

.role-form :deep(.el-input-number .el-input__wrapper) {
  border: 0;
  box-shadow: none;
  background: transparent;
}

.full-width {
  width: 100%;
}

.menu-tree {
  max-height: 230px;
  margin-bottom: 18px;
  padding: 10px 12px;
  overflow: auto;
  border: 1px solid #d8e6f4;
  border-radius: 9px;
  background: #fbfdff;
}

.menu-tree :deep(.el-tree-node__content) {
  height: 30px;
  border-radius: 6px;
}

.menu-tree :deep(.el-tree-node__content:hover) {
  background: #eef6ff;
}

.remark-item {
  margin-top: 2px;
}

.role-key-tag {
  font-family: Consolas, monospace;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
