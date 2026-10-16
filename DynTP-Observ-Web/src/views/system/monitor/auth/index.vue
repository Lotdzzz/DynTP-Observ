<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Delete, Refresh, Search, View} from "@element-plus/icons-vue";
import {useAuthLogManager} from "../../../../composables/monitor/AuthLogManagerComposable.ts";
import {authLogDataList, queryForm, total} from "../../../../composables/monitor/AuthLogFactory.ts";
import type {SysAuthLogVO} from "../../../../types/vo/monitor/SysAuthLogVO.ts";

const authLogManager = useAuthLogManager();
const dateRange = ref<[string, string] | null>(null);
const detailVisible = ref(false);
const currentLog = ref<SysAuthLogVO | null>(null);
const pageStart = computed(() => total.value === 0 ? 0 : (queryForm.pageNum - 1) * queryForm.pageSize + 1);
const pageEnd = computed(() => Math.min(queryForm.pageNum * queryForm.pageSize, total.value));

// Keep the date picker value in the query form.
function updateDateRange(value: [string, string] | null) {
  queryForm.beginTime = value?.[0] ?? "";
  queryForm.endTime = value?.[1] ?? "";
}

function resetSearch() {
  dateRange.value = null;
  authLogManager.resetQueryForm();
}

async function openDetail(id: number) {
  currentLog.value = await authLogManager.getAuthLog(id);
  detailVisible.value = true;
}

function changePage(page: number) {
  queryForm.pageNum = page;
  authLogManager.refreshAuthLogs();
}

// Load the first log page when this page opens.
onMounted(() => authLogManager.refreshAuthLogs());
</script>

<template>
  <el-dialog v-model="detailVisible" class="auth-log-dialog" width="min(720px, calc(100vw - 32px))" align-center>
    <template #header>
      <div class="dialog-title">
        <el-icon>
          <View/>
        </el-icon>
        认证日志详情
      </div>
    </template>
    <el-descriptions v-if="currentLog" :column="2" border class="log-detail">
      <el-descriptions-item label="登录账号">{{ currentLog.username }}</el-descriptions-item>
      <el-descriptions-item label="登录类型">
        <el-tag :type="currentLog.loginType === 'LOGIN' ? 'primary' : 'info'" size="small">
          {{ currentLog.loginType === 'LOGIN' ? '登录' : '退出' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="认证结果">
        <el-tag :type="currentLog.status === 1 ? 'success' : 'danger'" size="small">
          {{ currentLog.status === 1 ? '成功' : '失败' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="登录 IP">{{ currentLog.ipAddress || '—' }}</el-descriptions-item>
      <el-descriptions-item label="IP 归属地">{{ currentLog.ipLocation || '—' }}</el-descriptions-item>
      <el-descriptions-item label="登录时间">{{ currentLog.loginTime || '—' }}</el-descriptions-item>
      <el-descriptions-item label="退出时间">{{ currentLog.logoutTime || '—' }}</el-descriptions-item>
      <el-descriptions-item label="失败原因" :span="2">{{ currentLog.failReason || '—' }}</el-descriptions-item>
      <el-descriptions-item label="设备信息" :span="2"><span class="agent-text">{{ currentLog.userAgent || '—' }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="Token 标识" :span="2"><span class="agent-text">{{ currentLog.uuidId || '—' }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <main class="auth-log-page">
    <el-card class="content-card" shadow="never">
      <div class="page-toolbar">
        <div class="page-heading">
          <el-text class="page-eyebrow" type="primary">SYSTEM MONITOR</el-text>
          <el-text class="page-title" tag="h1">认证日志</el-text>
        </div>
        <el-form class="filter-form" inline>
          <el-form-item label="登录账号">
            <el-input v-model="queryForm.username" class="username-input" clearable placeholder="请输入登录账号"/>
          </el-form-item>
          <el-form-item label="登录类型">
            <el-select v-model="queryForm.loginType" class="type-select" clearable placeholder="全部类型">
              <el-option label="登录" value="LOGIN"/>
              <el-option label="退出" value="LOGOUT"/>
            </el-select>
          </el-form-item>
          <el-form-item label="认证结果">
            <el-select v-model="queryForm.status" class="status-select" clearable placeholder="全部结果">
              <el-option label="成功" :value="1"/>
              <el-option label="失败" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item label="登录时间">
            <el-date-picker v-model="dateRange" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
                            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                            @change="updateDateRange"/>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-toolbar">
        <el-space class="crud-actions">
          <el-button type="primary" @click="authLogManager.searchAuthLogs">
            <el-icon>
              <Search/>
            </el-icon>
            查询
          </el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="danger" plain @click="authLogManager.handleBatchDelete">
            <el-icon>
              <Delete/>
            </el-icon>
            批量删除
          </el-button>
          <el-button circle title="刷新列表" aria-label="刷新列表" @click="authLogManager.refreshAuthLogs">
            <el-icon>
              <Refresh/>
            </el-icon>
          </el-button>
        </el-space>
        <div class="toolbar-title">
          <el-text tag="h2">认证日志列表</el-text>
          <el-tag size="small" effect="plain">共 {{ total }} 条</el-tag>
        </div>
      </div>

      <el-table class="auth-log-table" :data="authLogDataList" height="calc(100vh - 338px)" stripe empty-text="暂无数据"
                @selection-change="authLogManager.handleSelectionChange">
        <el-table-column type="selection" width="52" align="center"/>
        <el-table-column prop="username" label="登录账号" min-width="130" show-overflow-tooltip/>
        <el-table-column label="登录类型" width="100" align="center">
          <template #default="{row}">
            <el-tag :type="row.loginType === 'LOGIN' ? 'primary' : 'info'" effect="light" size="small">
              {{ row.loginType === 'LOGIN' ? '登录' : '退出' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="认证结果" width="100" align="center">
          <template #default="{row}">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" effect="light" size="small">
              {{ row.status === 1 ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ipAddress" label="登录 IP" min-width="140" show-overflow-tooltip/>
        <el-table-column prop="failReason" label="失败原因" min-width="180" show-overflow-tooltip>
          <template #default="{row}">
            <el-text :type="row.failReason ? 'danger' : 'info'" size="small">{{ row.failReason || '—' }}</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="登录时间" min-width="180"/>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="openDetail(row.id)">详情</el-button>
            <el-button link type="danger" size="small" @click="authLogManager.deleteAuthLog(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-footer">
        <el-text type="info">显示 {{ pageStart }} - {{ pageEnd }} 条，共 {{ total }} 条</el-text>
        <el-pagination v-model:current-page="queryForm.pageNum" :page-size="queryForm.pageSize" background
                       layout="prev, pager, next" :total="total" @current-change="changePage"/>
      </div>
    </el-card>
  </main>
</template>

<style scoped>
.auth-log-page {
  min-height: calc(100vh - 118px);
  background: #f5f7fa;
}

.content-card {
  min-height: calc(100vh - 118px);
  border: 0;
  border-radius: 0;
  background: #fff;
}

.content-card :deep(.el-card__body) {
  display: flex;
  min-height: calc(100vh - 118px);
  flex-direction: column;
  padding: 18px 22px 14px;
}

.page-toolbar, .table-toolbar, .table-footer {
  display: flex;
  align-items: center;
}

.page-toolbar {
  flex-wrap: wrap;
  gap: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.page-heading {
  flex: 0 0 auto;
  min-width: 170px;
}

.page-eyebrow {
  display: block;
  margin-bottom: 3px;
  color: var(--el-color-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
}

.page-title {
  display: block;
  color: var(--el-text-color-primary);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
}

.filter-form {
  flex: 1;
  min-width: 660px;
}

.filter-form :deep(.el-form-item) {
  margin-right: 12px;
  margin-bottom: 0;
}

.username-input {
  width: 160px;
}

.type-select, .status-select {
  width: 120px;
}

.table-toolbar {
  gap: 16px;
  padding: 14px 0 10px;
}

.crud-actions {
  flex: 0 0 auto;
}

.toolbar-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar-title :deep(h2) {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
}

.auth-log-table {
  flex: 1;
  min-height: 420px;
}

.auth-log-table :deep(.el-table__header th) {
  color: var(--el-text-color-regular);
  background: #f5f7fa;
  font-weight: 600;
}

.auth-log-table :deep(.el-table__empty-block) {
  min-height: 330px;
}

.table-footer {
  justify-content: space-between;
  gap: 16px;
  padding-top: 14px;
}

.dialog-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #304b6d;
  font-weight: 700;
}

.agent-text {
  word-break: break-all;
}

.auth-log-dialog :deep(.el-dialog) {
  overflow: hidden;
  border: 1px solid #c9ddf4;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(239, 247, 255, .96), #fff 42%), #fff;
  box-shadow: 0 20px 50px rgba(42, 91, 145, .18);
}

.auth-log-dialog :deep(.el-dialog__body) {
  padding-top: 12px;
}

@media (max-width: 900px) {
  .filter-form {
    min-width: 0;
  }
}

@media (max-width: 760px) {
  .content-card :deep(.el-card__body) {
    padding: 14px;
  }

  .page-toolbar, .table-toolbar, .table-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .filter-form {
    display: flex;
    flex-direction: column;
  }

  .filter-form :deep(.el-form-item), .username-input, .type-select, .status-select {
    width: 100%;
  }

  .filter-form :deep(.el-form-item) {
    margin-right: 0;
  }

  .table-toolbar :deep(.el-space), .table-toolbar :deep(.el-space__wrapper) {
    width: 100%;
  }

  .table-toolbar :deep(.el-space__wrapper) {
    display: flex;
    flex-wrap: wrap;
  }

  .table-footer :deep(.el-pagination) {
    align-self: flex-end;
  }
}
</style>
