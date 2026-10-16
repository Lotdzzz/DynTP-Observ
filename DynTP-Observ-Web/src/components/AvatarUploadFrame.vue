<script setup lang="ts">
// this value is bind by parent component
import {ref} from "vue";
import {uploadApi} from "../api/upload/upload.ts";
import {ElMessage} from "element-plus";

const avatar = defineModel<string>('avatar', {})

// 文件选择器引用
const fileInput = ref<HTMLInputElement | null>(null);

// 上传状态，防止重复上传
const uploading = ref(false);

// 点击头像，打开文件选择器
function selectFile() {
  if (uploading.value) return;
  fileInput.value?.click();
}

// define handleFileChange function
async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  uploading.value = true;
  try {
    // 调用已有的上传 API
    // 更新父组件绑定的头像地址
    avatar.value = await uploadApi.upload(file);

    ElMessage.success("头像上传成功");
  } catch (error) {
    ElMessage.error("头像上传失败");
    console.error(error);
  } finally {
    uploading.value = false;

    // 允许用户重复选择同一文件
    input.value = "";
  }
}
</script>

<template>
  <el-tooltip content="添加头像" placement="top">
    <el-button
        class="avatar-upload-frame"
        :class="{ 'avatar-upload-frame--has-image': avatar }"
        type="primary"
        plain
        circle
        aria-label="添加头像"
        @click="selectFile"
    >
      <img v-if="avatar" class="avatar-upload-frame__image" :src="avatar" alt="头像"/>
      <el-icon v-else class="avatar-upload-frame__icon" :size="26">
        <span>+</span>
      </el-icon>
    </el-button>
  </el-tooltip>
  <!-- 隐藏文件选择器 -->
  <input
      ref="fileInput"
      type="file"
      accept="image/*"
      hidden
      @change="handleFileChange"
  />
</template>

<style scoped>
.avatar-upload-frame {
  position: relative;
  display: flex;
  margin: 0 auto;
  flex: 0 0 auto;
  width: 96px;
  height: 96px;
  padding: 0;
  border: 1px solid #c8def3;
  color: #5795da;
  background: linear-gradient(145deg, #ffffff, #edf6ff);
  box-shadow: 0 5px 14px rgba(63, 111, 160, .12),
  inset 0 0 0 4px rgba(255, 255, 255, .8);
  overflow: hidden;
  transition: border-color .2s ease, color .2s ease, box-shadow .2s ease,
  transform .2s ease;
}

.avatar-upload-frame:hover {
  border-color: #5795da;
  color: #3d7fc9;
  background: linear-gradient(145deg, #ffffff, #e5f2ff);
  box-shadow: 0 8px 18px rgba(63, 111, 160, .2),
  inset 0 0 0 4px rgba(255, 255, 255, .9);
  transform: translateY(-2px);
}

.avatar-upload-frame::before {
  position: absolute;
  inset: 11px;
  content: "";
  border: 1px dashed rgba(87, 149, 218, .45);
  border-radius: 50%;
  pointer-events: none;
}

.avatar-upload-frame__icon {
  position: relative;
  z-index: 1;
  font-size: 32px;
  font-weight: 400;
}

.avatar-upload-frame__image {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-upload-frame--has-image::before {
  display: none;
}
</style>