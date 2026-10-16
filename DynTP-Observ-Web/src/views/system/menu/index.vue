<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import CRUDAddForm from "../../../components/CRUDAddForm.vue";
import CRUDFrame from "../../../components/CRUDFrame.vue";
import CRUDUpdateForm from "../../../components/CRUDUpdateForm.vue";
import {useMenuManager} from "../../../composables/menu/MenuManagerComposable.ts";
import {
  additionMenu,
  allMenuList,
  CRUDFrameProps,
  menuDataList,
  queryForm,
  updatingMenu
} from "../../../composables/menu/MenuFactory.ts";
import type {SysMenuVO} from "../../../types/vo/system/SysMenuVO.ts";

// Control the add and edit dialogs.
const isAddVisible = ref(false);
const isUpdateVisible = ref(false);
const menuManager = useMenuManager(isAddVisible, isUpdateVisible);

const menuTypeLabel: Record<string, string> = {M: "目录", C: "菜单", F: "按钮"};
const parentMenuOptions = computed(() => [createRootMenuOption(allMenuList.value)]);
const updateParentOptions = computed(() => [
  createRootMenuOption(excludeMenuBranch(allMenuList.value, updatingMenu.value.menuId))
]);

// Remove the current menu and all of its descendants to avoid circular parent references.
function excludeMenuBranch(menus: SysMenuVO[], menuId: number): SysMenuVO[] {
  return menus
      .filter(menu => menu.menuId !== menuId)
      .map(menu => ({...menu, children: excludeMenuBranch(menu.children ?? [], menuId)}));
}

// Create a selectable virtual root so users can move a menu back to the top level.
function createRootMenuOption(children: SysMenuVO[]) {
  return {menuId: 0, menuName: "主菜单", children};
}

// Show fields that belong to the selected menu type only.
function isRouteMenu(menuType: string) {
  return menuType === "M" || menuType === "C";
}

// Load the first menu list when this page opens.
onMounted(() => menuManager.refreshMenuList());
</script>

<template>
  <CRUDUpdateForm v-model:isVisible="isUpdateVisible" @submit="menuManager.updateMenu">
    <template #table>
      <el-form class="menu-form" label-position="top">
        <div class="form-section-title"><span class="section-icon">◆</span>
          <div><strong>基本信息</strong><small>修改菜单名称、类型和显示方式</small></div>
        </div>
        <div class="form-grid">
          <el-form-item label="菜单名称" required>
            <el-input v-model="updatingMenu.menuName" placeholder="请输入菜单名称" clearable/>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-tree-select v-model="updatingMenu.parentId" :data="updateParentOptions" class="full-width"
                            check-strictly default-expand-all node-key="menuId"
                            :props="{label: 'menuName', children: 'children'}"/>
          </el-form-item>
          <el-form-item label="菜单类型" required>
            <el-radio-group v-model="updatingMenu.menuType">
              <el-radio-button label="M">目录</el-radio-button>
              <el-radio-button label="C">菜单</el-radio-button>
              <el-radio-button label="F">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="updatingMenu.orderNum" :min="0" controls-position="right" class="full-width"/>
          </el-form-item>
          <el-form-item label="显示状态">
            <el-radio-group v-model="updatingMenu.visible">
              <el-radio label="0">显示</el-radio>
              <el-radio label="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-radio-group v-model="updatingMenu.status">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="form-section-title form-section-title--secondary"><span class="section-icon">◆</span>
          <div><strong>路由与权限</strong><small>根据菜单类型填写页面或按钮配置</small></div>
        </div>
        <div class="form-grid">
          <el-form-item v-if="isRouteMenu(updatingMenu.menuType)" label="路由地址" required>
            <el-input v-model="updatingMenu.path" placeholder="例如 system/menu" clearable/>
          </el-form-item>
          <el-form-item v-if="updatingMenu.menuType === 'C'" label="组件路径" required>
            <el-input v-model="updatingMenu.component" placeholder="例如 system/menu/index" clearable/>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="updatingMenu.perms" placeholder="例如 system:menu:list" clearable/>
          </el-form-item>
          <el-form-item label="路由名称">
            <el-input v-model="updatingMenu.routeName" placeholder="请输入路由名称" clearable/>
          </el-form-item>
          <el-form-item v-if="isRouteMenu(updatingMenu.menuType)" label="是否外链">
            <el-radio-group v-model="updatingMenu.isFrame">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="isRouteMenu(updatingMenu.menuType)" label="是否缓存">
            <el-radio-group v-model="updatingMenu.isCache">
              <el-radio :label="0">缓存</el-radio>
              <el-radio :label="1">不缓存</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="updatingMenu.icon" placeholder="请输入图标名称" clearable/>
          </el-form-item>
          <el-form-item label="路由参数">
            <el-input v-model="updatingMenu.query" placeholder="例如 id=1" clearable/>
          </el-form-item>
        </div>
        <el-form-item label="备注">
          <el-input v-model="updatingMenu.remark" type="textarea" :rows="3" maxlength="200" show-word-limit
                    placeholder="请输入备注信息"/>
        </el-form-item>
      </el-form>
    </template>
  </CRUDUpdateForm>

  <CRUDAddForm v-model:isVisible="isAddVisible" @submit="menuManager.addMenu"
               @reset-add="menuManager.resetAdditionMenu">
    <template #table>
      <el-form class="menu-form" label-position="top">
        <div class="form-section-title"><span class="section-icon">◆</span>
          <div><strong>基本信息</strong><small>填写菜单名称、类型和显示方式</small></div>
        </div>
        <div class="form-grid">
          <el-form-item label="菜单名称" required>
            <el-input v-model="additionMenu.menuName" placeholder="请输入菜单名称" clearable/>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-tree-select v-model="additionMenu.parentId" :data="parentMenuOptions" class="full-width"
                            check-strictly default-expand-all node-key="menuId"
                            :props="{label: 'menuName', children: 'children'}"/>
          </el-form-item>
          <el-form-item label="菜单类型" required>
            <el-radio-group v-model="additionMenu.menuType">
              <el-radio-button label="M">目录</el-radio-button>
              <el-radio-button label="C">菜单</el-radio-button>
              <el-radio-button label="F">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="additionMenu.orderNum" :min="0" controls-position="right" class="full-width"/>
          </el-form-item>
          <el-form-item label="显示状态">
            <el-radio-group v-model="additionMenu.visible">
              <el-radio label="0">显示</el-radio>
              <el-radio label="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-radio-group v-model="additionMenu.status">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="form-section-title form-section-title--secondary"><span class="section-icon">◆</span>
          <div><strong>路由与权限</strong><small>根据菜单类型填写页面或按钮配置</small></div>
        </div>
        <div class="form-grid">
          <el-form-item v-if="isRouteMenu(additionMenu.menuType)" label="路由地址" required>
            <el-input v-model="additionMenu.path" placeholder="例如 system/menu" clearable/>
          </el-form-item>
          <el-form-item v-if="additionMenu.menuType === 'C'" label="组件路径" required>
            <el-input v-model="additionMenu.component" placeholder="例如 system/menu/index" clearable/>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="additionMenu.perms" placeholder="例如 system:menu:list" clearable/>
          </el-form-item>
          <el-form-item label="路由名称">
            <el-input v-model="additionMenu.routeName" placeholder="请输入路由名称" clearable/>
          </el-form-item>
          <el-form-item v-if="isRouteMenu(additionMenu.menuType)" label="是否外链">
            <el-radio-group v-model="additionMenu.isFrame">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="isRouteMenu(additionMenu.menuType)" label="是否缓存">
            <el-radio-group v-model="additionMenu.isCache">
              <el-radio :label="0">缓存</el-radio>
              <el-radio :label="1">不缓存</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="additionMenu.icon" placeholder="请输入图标名称" clearable/>
          </el-form-item>
          <el-form-item label="路由参数">
            <el-input v-model="additionMenu.query" placeholder="例如 id=1" clearable/>
          </el-form-item>
        </div>
        <el-form-item label="备注">
          <el-input v-model="additionMenu.remark" type="textarea" :rows="3" maxlength="200" show-word-limit
                    placeholder="请输入备注信息"/>
        </el-form-item>
      </el-form>
    </template>
  </CRUDAddForm>

  <CRUDFrame :CRUDFrameProps="CRUDFrameProps" @search="menuManager.selectMenuList" @reset="menuManager.resetQueryForm"
             @refresh="menuManager.refreshCurrentPage" @batch-delete="menuManager.handleBatchDelete"
             @create="menuManager.openAddFrame">
    <template #search>
      <el-form class="filter-form" inline>
        <el-form-item label="菜单名称">
          <el-input v-model="queryForm.menuName" class="menu-name-input" clearable placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-select v-model="queryForm.menuType" class="type-select" clearable placeholder="全部类型">
            <el-option v-for="(label, value) in menuTypeLabel" :key="value" :label="label" :value="value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-select v-model="queryForm.visible" class="status-select" clearable placeholder="全部状态">
            <el-option label="显示" value="0"/>
            <el-option label="隐藏" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="queryForm.status" class="status-select" clearable placeholder="全部状态">
            <el-option label="正常" value="0"/>
            <el-option label="停用" value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #data>
      <el-table class="user-table" :data="menuDataList" row-key="menuId" default-expand-all
                :tree-props="{children: 'children'}" height="calc(100vh - 310px)" stripe empty-text="暂无数据"
                @selection-change="menuManager.handleSelectionChange">
        <el-table-column type="selection" width="52" align="center"/>
        <el-table-column prop="menuName" label="菜单名称" min-width="150" show-overflow-tooltip/>
        <el-table-column label="类型" width="92" align="center">
          <template #default="{row}">
            <el-tag :type="row.menuType === 'F' ? 'warning' : row.menuType === 'M' ? 'success' : 'primary'"
                    effect="light" size="small">{{ menuTypeLabel[row.menuType] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由地址" min-width="160" show-overflow-tooltip/>
        <el-table-column prop="perms" label="权限标识" min-width="180" show-overflow-tooltip>
          <template #default="{row}">
            <el-tag v-if="row.perms" effect="plain" class="perms-tag">{{ row.perms }}</el-tag>
            <el-text v-else type="info">—</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="72" align="center"/>
        <el-table-column label="显示" width="82">
          <template #default="{row}">
            <el-tag :type="row.visible === '0' ? 'success' : 'info'" effect="light" size="small">
              {{ row.visible === '0' ? '显示' : '隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="82">
          <template #default="{row}">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" effect="light" size="small">
              {{ row.status === '0' ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="menuManager.openUpdateFrame(row.menuId)">编辑
            </el-button>
            <el-button link type="danger" size="small" @click="menuManager.deleteMenu(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </CRUDFrame>
</template>

<style scoped>
.menu-name-input {
  width: 180px;
}

.type-select, .status-select {
  width: 128px;
}

.menu-form {
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

.menu-form :deep(.el-form-item) {
  margin-bottom: 17px;
}

.menu-form :deep(.el-form-item__label) {
  padding-bottom: 6px;
  color: #617893;
  font-size: 12px;
  font-weight: 600;
}

.menu-form :deep(.el-input__wrapper), .menu-form :deep(.el-input-number), .menu-form :deep(.el-select__wrapper), .menu-form :deep(.el-textarea__inner) {
  border: 1px solid #d8e6f4;
  border-radius: 9px;
  background: #fbfdff;
  box-shadow: 0 2px 6px rgba(63, 111, 160, .04);
}

.menu-form :deep(.el-input-number .el-input__wrapper) {
  border: 0;
  box-shadow: none;
  background: transparent;
}

.full-width {
  width: 100%;
}

.perms-tag {
  font-family: Consolas, monospace;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
