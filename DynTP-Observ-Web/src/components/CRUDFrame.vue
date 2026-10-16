<script setup lang="ts">
import type {CRUDFrameProps} from "../types/props/CRUDFrameProps.ts";
import {Delete, Plus, Refresh, Search} from "@element-plus/icons-vue";

// Receive the page title from the parent view.
const props = defineProps<{
  CRUDFrameProps: CRUDFrameProps
}>();

// Expose generic CRUD actions without coupling this component to a domain service.
const emit = defineEmits<{
  (event: "search"): void
  (event: "reset"): void
  (event: "create"): void
  (event: "batch-delete"): void
  (event: "refresh"): void
  (event: "page-change", page: number): void
}>()
</script>

<template>
  <main class="user-page">
    <el-card class="content-card" shadow="never">
      <div class="page-toolbar">
        <div class="page-heading">
          <el-text class="page-eyebrow" type="primary">SYSTEM MANAGEMENT</el-text>
          <el-text class="page-title" tag="h1">{{ props.CRUDFrameProps.title }}</el-text>
        </div>

        <!-- search frame slot -->
        <slot name="search"/>
      </div>

      <div class="table-toolbar">
        <el-space class="crud-actions">
          <el-button type="primary" @click="emit('search')">
            <el-icon>
              <Search/>
            </el-icon>
            查询
          </el-button>
          <el-button @click="emit('reset')">
            重置
          </el-button>
          <el-button type="primary" @click="emit('create')">
            <el-icon>
              <Plus/>
            </el-icon>
            新增{{ props.CRUDFrameProps.tag }}
          </el-button>
          <el-button type="danger" plain @click="emit('batch-delete')">
            <el-icon>
              <Delete/>
            </el-icon>
            批量删除
          </el-button>
          <el-button circle title="刷新列表" aria-label="刷新列表" @click="emit('refresh')">
            <el-icon>
              <Refresh/>
            </el-icon>
          </el-button>
        </el-space>
        <div class="toolbar-title">
          <el-text tag="h2">{{ props.CRUDFrameProps.tag }}列表</el-text>
          <el-tag size="small" effect="plain">共 {{ props.CRUDFrameProps.dataLength }} 条</el-tag>
        </div>
      </div>

      <!--   data table slot   -->
      <slot name="data"/>

      <div class="table-footer">
        <el-text v-if="props.CRUDFrameProps.showPagination !== false" type="info">
          显示 {{ props.CRUDFrameProps.dataLength === 0 ? 0 : (props.CRUDFrameProps.pageNum - 1) * props.CRUDFrameProps.pageSize + 1 }}
          - {{ Math.min(props.CRUDFrameProps.pageNum * props.CRUDFrameProps.pageSize, props.CRUDFrameProps.dataLength) }} 条，共 {{ props.CRUDFrameProps.dataLength }} 条
        </el-text>
        <el-text v-else type="info">树状结构共 {{ props.CRUDFrameProps.dataLength }} 条</el-text>
        <el-pagination
            v-if="props.CRUDFrameProps.showPagination !== false"
            background
            layout="prev, pager, next"
            :current-page="props.CRUDFrameProps.pageNum"
            :page-size="props.CRUDFrameProps.pageSize"
            :total="props.CRUDFrameProps.dataLength"
            @current-change="emit('page-change', $event)"
        />
      </div>
    </el-card>
  </main>
</template>

<style scoped>
.user-page {
  min-height: calc(100vh - 118px);
  padding: 0;
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

.page-toolbar,
.table-toolbar,
.table-footer {
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
  min-width: 560px;
}

.filter-form :deep(.el-form-item) {
  margin-right: 12px;
  margin-bottom: 0;
}

.keyword-input {
  width: 260px;
}

.status-select {
  width: 150px;
}

.table-toolbar {
  justify-content: flex-start;
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

.user-table {
  flex: 1;
  min-height: 420px;
}

.user-table :deep(.el-table__header th) {
  color: var(--el-text-color-regular);
  background: #f5f7fa;
  font-weight: 600;
}

.user-table :deep(.el-table__empty-block) {
  min-height: 330px;
}

.empty-icon {
  width: 54px;
  height: 54px;
  color: var(--el-color-primary-light-5);
  font-size: 46px;
}

.table-footer {
  justify-content: space-between;
  gap: 16px;
  padding-top: 14px;
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

  .page-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .filter-form {
    display: flex;
    flex-direction: column;
  }

  .filter-form :deep(.el-form-item),
  .keyword-input,
  .status-select {
    width: 100%;
  }

  .filter-form :deep(.el-form-item) {
    margin-right: 0;
  }

  .table-toolbar,
  .table-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .table-toolbar :deep(.el-space) {
    width: 100%;
  }

  .table-toolbar :deep(.el-space__wrapper) {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .table-footer :deep(.el-pagination) {
    align-self: flex-end;
  }
}
</style>
