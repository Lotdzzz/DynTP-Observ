<script setup lang="ts">
import {onMounted, ref} from "vue";
import CRUDFrame from "../../../components/CRUDFrame.vue";
import CRUDAddForm from "../../../components/CRUDAddForm.vue";
import CRUDUpdateForm from "../../../components/CRUDUpdateForm.vue";
import AvatarUploadFrame from "../../../components/AvatarUploadFrame.vue";
import {
  additionUser,
  CRUDFrameProps,
  queryForm,
  roleList,
  updatingUser,
  userDataList,
} from "../../../composables/user/UserFactory.ts";
import {useUserManager} from "../../../composables/user/UserManagerComposable.ts";

// control add or update frame invisibility
const isVisible = ref(false);

// control the visibility of the add or update frame
const isUpdateFrameVisible = ref(false);

const userManager = useUserManager(isVisible, isUpdateFrameVisible);

onMounted(async () => {
  // page initialization, fetch user data and role list
  await Promise.all([
    userManager.userData(),
    userManager.fetchRoleList(),
  ]);
})
</script>

<template>
  <CRUDUpdateForm v-model:isVisible="isUpdateFrameVisible"
                  @submit="userManager.updateUser(updatingUser)"
  >
    <template #table>
      <el-form class="add-user-form" label-position="top">
        <div class="form-section-title">
          <span class="section-icon">◆</span>
          <div>
            <strong>基本信息</strong>
            <small>修改用户的基础资料</small>
          </div>
        </div>

        <div class="form-grid">
          <el-form-item label="用户名" required>
            <el-input
                v-model="updatingUser.userName"
                prefix-icon="User"
                placeholder="请输入用户名"
                clearable
            />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
                v-model="updatingUser.nickName"
                prefix-icon="EditPen"
                placeholder="请输入昵称"
                clearable
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
                v-model="updatingUser.password"
                prefix-icon="EditPen"
                type="password"
                show-password
                placeholder="请输入密码"
                clearable
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                v-model="updatingUser.email"
                prefix-icon="Message"
                type="email"
                placeholder="请输入邮箱"
                clearable
            />
          </el-form-item>
          <el-form-item label="头像 URL">
            <div class="avatar-url-field">
              <AvatarUploadFrame v-model:avatar="updatingUser.avatar"/>
            </div>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select
                v-model="updatingUser.status"
                class="full-width"
                placeholder="请选择账号状态"
            >
              <el-option label="启用" value="0"/>
              <el-option label="禁用" value="1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <!--
            describe for these components
            condition in selected:
              if attribution of v-model matched with the value of el-option,
               then this option will be selected
                  -->
            <el-select
                v-model="updatingUser.roleIds"
                class="full-width"
                multiple
                clearable
                collapse-tags
                placeholder="请选择角色"
            >
              <el-option
                  v-for="role in roleList"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="form-section-title form-section-title--secondary">
          <span class="section-icon">◆</span>
          <div>
            <strong>补充信息</strong>
            <small>更新备注，方便后续管理</small>
          </div>
        </div>

        <el-form-item label="备注">
          <el-input
              v-model="updatingUser.remark"
              type="textarea"
              :rows="3"
              maxlength="200"
              show-word-limit
              placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
    </template>
  </CRUDUpdateForm>

  <CRUDAddForm v-model:isVisible="isVisible"
               @submit="userManager.addUser(additionUser)"
               @resetAdd="userManager.resetAdditionUser"
  >
    <template #table>
      <el-form class="add-user-form" label-position="top">
        <div class="form-section-title">
          <span class="section-icon">◆</span>
          <div>
            <strong>基本信息</strong>
            <small>填写用户的基础资料</small>
          </div>
        </div>

        <div class="form-grid">
          <el-form-item label="用户名" required>
            <el-input
                v-model="additionUser.userName"
                prefix-icon="User"
                placeholder="请输入用户名"
                clearable
            />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
                v-model="additionUser.nickName"
                prefix-icon="EditPen"
                placeholder="请输入昵称"
                clearable
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
                v-model="additionUser.password"
                prefix-icon="EditPen"
                type="password"
                show-password
                placeholder="请输入密码"
                clearable
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                v-model="additionUser.email"
                prefix-icon="Message"
                type="email"
                placeholder="请输入邮箱"
                clearable
            />
          </el-form-item>
          <el-form-item label="头像 URL">
            <div class="avatar-url-field">
              <AvatarUploadFrame v-model:avatar="additionUser.avatar"/>
            </div>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select
                v-model="additionUser.status"
                class="full-width"
                placeholder="请选择账号状态"
            >
              <el-option label="启用" value="0"/>
              <el-option label="禁用" value="1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
                v-model="additionUser.roleIds"
                class="full-width"
                multiple
                clearable
                collapse-tags
                placeholder="请选择角色"
            >
              <el-option
                  v-for="role in roleList"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="form-section-title form-section-title--secondary">
          <span class="section-icon">◆</span>
          <div>
            <strong>补充信息</strong>
            <small>添加备注，方便后续管理</small>
          </div>
        </div>

        <el-form-item label="备注">
          <el-input
              v-model="additionUser.remark"
              type="textarea"
              :rows="3"
              maxlength="200"
              show-word-limit
              placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
    </template>
  </CRUDAddForm>

  <CRUDFrame :CRUDFrameProps="CRUDFrameProps"
             @search="userManager.selectUserList"
             @reset="userManager.resetQueryForm"
             @refresh="userManager.refreshCurrentPage"
             @batch-delete="userManager.handleBatchDelete"
             @create="isVisible=true"
             @page-change="userManager.changePage"
  >
    <template #search>
      <!--  search frame card  -->
      <el-form class="filter-form" inline>
        <el-form-item label="用户昵称">
          <el-input
              class="user-nickname-input"
              clearable
              placeholder="请输入用户昵称"
              v-model="queryForm.nickName"
          >
            <template #prefix>⌕</template>
          </el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
              class="username-input"
              clearable
              placeholder="请输入用户名"
              v-model="queryForm.userName"
          />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select class="status-select" placeholder="全部状态" clearable v-model="queryForm.status">
            <el-option label="启用" value="0"/>
            <el-option label="禁用" value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
    </template>

    <template #data>
      <el-table
          class="user-table"
          :data="userDataList ?? []"
          @selection-change="userManager.handleSelectionChange"
          height="calc(100vh - 310px)"
          stripe
          empty-text="暂无数据"
      >
        <el-table-column type="selection" width="52" align="center"/>
        <el-table-column label="用户信息" min-width="220">
          <template #default="{ row }">
            <el-space>
              <el-avatar :src="row.avatar || undefined" :size="36" :alt="row.nickName || row.userName">
                {{ row.nickName?.charAt(0) || row.userName?.charAt(0) }}
              </el-avatar>
              <el-space direction="vertical" :size="0">
                <el-text>{{ row.nickName || "未设置昵称" }}</el-text>
              </el-space>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" min-width="150"/>
        <el-table-column prop="email" label="邮箱" min-width="220" show-overflow-tooltip/>
        <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip/>
        <el-table-column label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag
                :type="row.status === '0' ? 'success' : 'danger'"
                effect="light"
                size="small"
            >
              {{ row.status === '0' ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="180"/>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="userManager.openUpdateFrame(row.userId)">
              编辑
            </el-button>
            <el-button link type="danger" size="small" @click="userManager.deleteUser(row.userId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </CRUDFrame>
</template>

<style scoped>
.user-nickname-input,
.username-input,
.email-input,
.remark-input {
  width: 180px;
}

.status-select {
  width: 140px;
}

.add-user-form {
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
  margin-top: 8px;
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

.form-section-title strong,
.form-section-title small {
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

.avatar-url-field {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-url-field :deep(.el-input) {
  min-width: 0;
}

.add-user-form :deep(.el-form-item) {
  margin-bottom: 17px;
}

.add-user-form :deep(.el-form-item__label) {
  padding-bottom: 6px;
  color: #617893;
  font-size: 12px;
  font-weight: 600;
}

.add-user-form :deep(.el-input__wrapper),
.add-user-form :deep(.el-select__wrapper),
.add-user-form :deep(.el-textarea__inner) {
  border: 1px solid #d8e6f4;
  border-radius: 9px;
  background: #fbfdff;
  box-shadow: 0 2px 6px rgba(63, 111, 160, .04);
  transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
}

.add-user-form :deep(.el-input__wrapper:hover),
.add-user-form :deep(.el-select__wrapper:hover),
.add-user-form :deep(.el-textarea__inner:hover) {
  border-color: #a7c8e9;
  background: #fff;
}

.add-user-form :deep(.el-input__wrapper.is-focus),
.add-user-form :deep(.el-select__wrapper.is-focused),
.add-user-form :deep(.el-textarea__inner:focus) {
  border-color: #5795da;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(87, 149, 218, .12);
}

.full-width {
  width: 100%;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
