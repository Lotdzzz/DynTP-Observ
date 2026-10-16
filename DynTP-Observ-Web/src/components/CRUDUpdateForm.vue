<script setup lang="ts">
import {onUnmounted} from "vue";

// receive the props from the parent view
const isVisible = defineModel<boolean>('isVisible', {
  default: false
})

onUnmounted(() => {
  isVisible.value = false;
});

// Expose generic CRUD actions without coupling this component to a domain service.
const emit = defineEmits<{
  (event: "submit"): void,
}>()
</script>

<template>
  <el-dialog
      class="crud-update-dialog"
      v-model="isVisible"
      width="min(760px, calc(100vw - 32px))"
      align-center
      :close-on-click-modal="false"
  >
    <div class="slot-container">
      <slot name="table"/>
    </div>

    <template #footer>
      <div class="dialog-actions">
        <el-button type="primary" @click="emit('submit')">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.crud-update-dialog :deep(.el-dialog) {
  overflow: hidden;
  border: 1px solid #c9ddf4;
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(239, 247, 255, .96), #fff 42%),
    #fff;
  box-shadow:
    0 20px 50px rgba(42, 91, 145, .18),
    0 0 0 5px rgba(104, 163, 224, .08);
}

.crud-update-dialog :deep(.el-dialog::before) {
  position: absolute;
  top: 0;
  right: 28px;
  left: 28px;
  height: 3px;
  border-radius: 0 0 6px 6px;
  background: linear-gradient(90deg, #4e8ed5, #9bc9f5, #4e8ed5);
  content: "";
}

.crud-update-dialog :deep(.el-dialog__header) {
  min-height: 18px;
  margin: 0;
  padding: 18px 24px 0;
}

.crud-update-dialog :deep(.el-dialog__headerbtn) {
  top: 16px;
  right: 18px;
}

.crud-update-dialog :deep(.el-dialog__body) {
  padding: 10px 24px 24px;
}

.slot-container {
  padding: 22px;
  border: 1px solid #dceafa;
  border-radius: 13px;
  background: rgba(255, 255, 255, .82);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .95),
    0 5px 16px rgba(79, 133, 190, .06);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #e1edf9;
}

.dialog-actions :deep(.el-button) {
  min-width: 84px;
  border-radius: 8px;
}

@media (max-width: 620px) {
  .crud-update-dialog :deep(.el-dialog__body) {
    padding: 8px 14px 16px;
  }

  .slot-container {
    padding: 16px;
  }

  .dialog-actions :deep(.el-button) {
    flex: 1;
  }
}
</style>
