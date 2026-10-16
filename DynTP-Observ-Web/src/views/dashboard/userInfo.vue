<script setup lang="ts">
import type {UserInfoVO} from "../../types/vo/system/UserInfoVO.ts";
import type {SysUserDTO} from "../../types/dto/system/SysUserDTO.ts";
import type {FormInstance, FormRules} from "element-plus";
import {ElMessage} from "element-plus";
import {onMounted, reactive, ref} from "vue";
import {loginApi} from "../../api/auth/login.ts";
import {userApi} from "../../api/auth/user.ts";
import {userStore} from "../../stores/userInfo.ts";
import AvatarUploadFrame from "../../components/AvatarUploadFrame.vue";

// Store the summary shown at the top of the account center.
const userInfo = ref<UserInfoVO | null>(null);
const profileFormRef = ref<FormInstance>();
const passwordFormRef = ref<FormInstance>();
const savingProfile = ref(false);
const savingPassword = ref(false);

const profileForm = reactive<SysUserDTO>({
  userId: 0,
  userName: "",
  nickName: "",
  email: "",
  avatar: "",
  password: "",
  status: "0",
  remark: "",
  roleIds: []
});

const passwordForm = reactive({
  password: "",
  confirmPassword: ""
});

const profileRules: FormRules<SysUserDTO> = {
  nickName: [
    {required: true, message: "请输入昵称", trigger: "blur"},
    {max: 30, message: "昵称不能超过 30 个字符", trigger: "blur"}
  ],
  email: [
    {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"}
  ]
};

const passwordRules: FormRules<typeof passwordForm> = {
  password: [
    {required: true, message: "请输入新密码", trigger: "blur"},
    {min: 6, max: 32, message: "密码长度应为 6 到 32 个字符", trigger: "blur"}
  ],
  confirmPassword: [
    {required: true, message: "请再次输入新密码", trigger: "blur"},
    {
      validator: (_, value, callback) => {
        if (value !== passwordForm.password) {
          callback(new Error("两次输入的密码不一致"));
          return;
        }
        callback();
      },
      trigger: "blur"
    }
  ]
};

// Load the editable account record through the current-user-only endpoint.
async function loadUserInfo() {
  const summary = await loginApi.getUserInfo();
  const user = await userApi.getByOwner(summary.userId);

  userInfo.value = summary;
  userStore().setUserInfo(summary);
  Object.assign(profileForm, {
    userId: user.userId,
    userName: user.userName,
    nickName: user.nickName,
    email: user.email,
    avatar: user.avatar,
    password: "",
    status: user.status,
    remark: user.remark,
    roleIds: []
  });
}

// Persist profile fields while keeping the password unchanged.
async function saveProfile() {
  const valid = await profileFormRef.value?.validate().then(() => true).catch(() => false);
  if (!valid) return;

  savingProfile.value = true;
  try {
    await userApi.updateByOwner({...profileForm, password: "", roleIds: []});
    await loadUserInfo();
    ElMessage.success("个人资料已保存");
  } finally {
    savingProfile.value = false;
  }
}

// Persist only the new password with the existing profile values.
async function savePassword() {
  const valid = await passwordFormRef.value?.validate().then(() => true).catch(() => false);
  if (!valid) return;

  savingPassword.value = true;
  try {
    await userApi.updateByOwner({...profileForm, password: passwordForm.password, roleIds: []});
    passwordForm.password = "";
    passwordForm.confirmPassword = "";
    passwordFormRef.value?.clearValidate();
    ElMessage.success("密码已修改");
  } finally {
    savingPassword.value = false;
  }
}

// Load the current user's profile when the page opens.
onMounted(async () => {
  await loadUserInfo();
});
</script>

<template>
  <main class="user-info-page">
    <section class="user-info-card" aria-label="用户信息">
      <div class="card-header">
        <div>
          <p class="eyebrow">ACCOUNT CENTER</p>
          <h1>个人中心</h1>
          <p class="subtitle">维护您的资料、头像和登录密码</p>
        </div>
        <span class="header-badge">用户资料</span>
      </div>

      <div v-if="userInfo" class="user-profile">
        <div class="avatar" aria-hidden="true">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt=""/>
          <span v-else>{{ userInfo.nickName.slice(0, 1) }}</span>
        </div>
        <div class="profile-heading">
          <h2>{{ userInfo.nickName }}</h2>
          <p>@{{ userInfo.userName }}</p>
        </div>
      </div>

      <div v-if="userInfo" class="info-grid">
        <div class="info-item">
          <span class="info-label">用户 ID</span>
          <strong>{{ userInfo.userId }}</strong>
        </div>
        <div class="info-item">
          <span class="info-label">用户账号</span>
          <strong>{{ userInfo.userName }}</strong>
        </div>
        <div class="info-item info-item-wide">
          <span class="info-label">邮箱地址</span>
          <strong>{{ userInfo.email || '暂未填写' }}</strong>
        </div>
      </div>

      <div v-if="userInfo" class="edit-grid">
        <el-card class="edit-card" shadow="never">
          <template #header>
            <div class="edit-card-header">
              <div>
                <strong>基本资料</strong>
                <span>更新头像、昵称和邮箱</span>
              </div>
            </div>
          </template>
          <el-form ref="profileFormRef" :model="profileForm" :rules="profileRules" label-position="top">
            <el-form-item label="头像">
              <div class="avatar-upload-row">
                <AvatarUploadFrame v-model:avatar="profileForm.avatar"/>
                <el-text type="info" size="small">点击头像选择图片并上传</el-text>
              </div>
            </el-form-item>
            <el-form-item label="用户账号">
              <el-input v-model="profileForm.userName" disabled/>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="profileForm.nickName" maxlength="30" show-word-limit placeholder="请输入昵称"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="profileForm.email" placeholder="请输入邮箱地址"/>
            </el-form-item>
            <el-button type="primary" :loading="savingProfile" @click="saveProfile">保存资料</el-button>
          </el-form>
        </el-card>

        <el-card class="edit-card" shadow="never">
          <template #header>
            <div class="edit-card-header">
              <div>
                <strong>修改密码</strong>
                <span>设置新的登录密码</span>
              </div>
            </div>
          </template>
          <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-position="top">
            <el-form-item label="新密码" prop="password">
              <el-input v-model="passwordForm.password" type="password" show-password autocomplete="new-password"
                        placeholder="请输入 6 至 32 位新密码"/>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="passwordForm.confirmPassword" type="password" show-password autocomplete="new-password"
                        placeholder="请再次输入新密码" @keyup.enter="savePassword"/>
            </el-form-item>
            <el-button type="primary" :loading="savingPassword" @click="savePassword">修改密码</el-button>
          </el-form>
        </el-card>
      </div>

      <div v-else class="loading-state">正在加载用户信息...</div>
    </section>
  </main>
</template>

<style scoped>
.user-info-page {
  min-height: 100%;
  padding: 48px clamp(20px, 5vw, 72px);
  background: linear-gradient(135deg, #f5f9ff 0%, #eef5ff 100%);
}

.user-info-card {
  width: min(100%, 760px);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 42px);
  border: 1px solid #dce9fb;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 50px rgba(56, 104, 174, .12);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 28px;
  border-bottom: 1px solid #edf3fb;
}

.eyebrow {
  margin: 0 0 8px;
  color: #4b82d6;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 8px;
  color: #1f3f70;
  font-size: clamp(24px, 4vw, 32px);
}

.subtitle {
  margin-bottom: 0;
  color: #8a9fbb;
  font-size: 13px;
}

.header-badge {
  padding: 7px 12px;
  border-radius: 999px;
  color: #3976cc;
  background: #edf5ff;
  font-size: 12px;
  white-space: nowrap;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 30px 0;
}

.avatar {
  display: grid;
  flex: 0 0 76px;
  place-items: center;
  width: 76px;
  height: 76px;
  overflow: hidden;
  border: 4px solid #e5f0ff;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #6097e5, #326ac1);
  font-size: 27px;
  font-weight: 700;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-heading h2 {
  margin-bottom: 6px;
  color: #244673;
  font-size: 21px;
}

.profile-heading p {
  margin-bottom: 0;
  color: #91a4bc;
  font-size: 13px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 17px 18px;
  border: 1px solid #e4eefb;
  border-radius: 12px;
  background: #f8fbff;
}

.info-item-wide {
  grid-column: 1 / -1;
}

.info-label {
  color: #8ba2bf;
  font-size: 12px;
}

.info-item strong {
  overflow: hidden;
  color: #315987;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.edit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.edit-card {
  border: 1px solid #dfeaf8;
  border-radius: 14px;
  background: #fbfdff;
}

.edit-card :deep(.el-card__header) {
  padding: 16px 18px;
  border-bottom-color: #e7eff9;
}

.edit-card :deep(.el-card__body) {
  padding: 18px;
}

.edit-card :deep(.el-form-item) {
  margin-bottom: 17px;
}

.edit-card :deep(.el-form-item__label) {
  color: #617893;
  font-size: 12px;
  font-weight: 600;
}

.edit-card :deep(.el-input__wrapper) {
  min-height: 36px;
  border: 1px solid #d8e6f4;
  border-radius: 8px;
  background: #fff;
  box-shadow: none;
}

.edit-card :deep(.el-input__wrapper.is-focus) {
  border-color: #5795da;
  box-shadow: 0 0 0 3px rgba(87, 149, 218, .12);
}

.edit-card-header strong,
.edit-card-header span {
  display: block;
}

.edit-card-header strong {
  color: #315987;
  font-size: 15px;
}

.edit-card-header span {
  margin-top: 3px;
  color: #91a4bc;
  font-size: 12px;
}

.avatar-upload-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.loading-state {
  padding: 48px 0 20px;
  color: #7f98b8;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 560px) {
  .card-header {
    flex-direction: column;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .edit-grid {
    grid-template-columns: 1fr;
  }

  .info-item-wide {
    grid-column: auto;
  }
}
</style>
