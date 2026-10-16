<script setup lang="ts">
import type {UserInfoVO} from "../types/vo/system/UserInfoVO.ts";
import {ref, onMounted, onUnmounted} from 'vue'
import staticRouterConstants from "../constants/staticRouter.ts";
import router from "../router";
import tokenUtils from "../utils/token.ts";
import {loginApi} from "../api/auth/login.ts";

// define user info props
const props = defineProps<{
  userInfo: UserInfoVO
  // menu fold state
  collapse: boolean
}>()

// change user
function changeUser() {
  router.push(staticRouterConstants.login)
}

// logout api
async function logout() {
  // send logout request to server
  await loginApi.logout()

  // clear localStorage token
  tokenUtils.remove()

  // redirect to login page
  router.replace(staticRouterConstants.login)
}

// redirect to user info page
function redirectToUserInfo() {
  router.push(staticRouterConstants.userInfo)
}

// 控制用户框展开状态
const isUserMenuOpen = ref(false)

// 用户框及其弹出菜单的容器引用
const userMenuRef = ref<HTMLElement | null>(null)

// 点击用户框，切换展开状态
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 点击页面其他区域时关闭
function handleClickOutside(event: MouseEvent) {
  // 获取被点击的元素
  const target = event.target as Node | null

  // 如果点击位置不在用户框内部，则关闭
  if (
      isUserMenuOpen.value &&
      target &&
      userMenuRef.value &&
      !userMenuRef.value.contains(target)
  ) {
    isUserMenuOpen.value = false
  }
}

// 组件挂载后注册全局点击监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除监听，防止内存泄漏
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
      ref="userMenuRef"
      class="user-menu"
      @click.stop
  >
    <button
        type="button"
        class="user-display-frame"
        aria-label="用户信息"
        :aria-expanded="isUserMenuOpen"
        @click="toggleUserMenu"
    >
      <div class="user-avatar" aria-hidden="true">
        <img v-if="props.userInfo.avatar" :src="props.userInfo.avatar" alt=""/>
        <span v-else>{{ props.userInfo.nickName.slice(0, 1) }}</span>
      </div>

      <div class="user-details">
        <strong>{{ props.userInfo.nickName }}</strong>
        <small v-if="props.userInfo.email">{{ props.userInfo.email }}</small>
      </div>

      <span class="user-menu-arrow" :class="{ 'is-open': isUserMenuOpen }" aria-hidden="true">⌄</span>
    </button>

    <Transition name="user-menu">
      <nav
          v-if="isUserMenuOpen"
          class="user-menu-options"
          aria-label="用户菜单"
      >
        <div class="menu-heading">
          <span>账户菜单</span>
          <small>管理您的账户</small>
        </div>
        <div class="menu-items">
          <button type="button" @click="changeUser">
            <span class="menu-icon">⇄</span>
            <span class="menu-label">切换用户</span>
            <span class="menu-chevron">›</span>
          </button>
          <button type="button" @click="redirectToUserInfo">
            <span class="menu-icon">◎</span>
            <span class="menu-label">个人中心</span>
            <span class="menu-chevron">›</span>
          </button>
          <button class="logout-action" type="button" @click="logout">
            <span class="menu-icon">↪</span>
            <span class="menu-label">退出登录</span>
            <span class="menu-chevron">›</span>
          </button>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
.user-menu {
  position: relative;
  width: 100%;
}

.user-display-frame {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #e8eef6;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(62, 86, 122, .06);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.user-display-frame:hover,
.user-display-frame[aria-expanded="true"] {
  border-color: #c9dcf7;
  box-shadow: 0 8px 22px rgba(62, 112, 181, .14);
  transform: translateY(-1px);
}

.user-menu-arrow {
  margin-left: auto;
  color: #8ca5c4;
  font-size: 20px;
  line-height: 1;
  transition: color .2s ease, transform .25s ease;
}

.user-menu-arrow.is-open {
  color: #3979d0;
  transform: rotate(180deg);
}

.user-menu-enter-active,
.user-menu-leave-active {
  transition: opacity .18s ease, transform .18s ease;
  transform-origin: bottom center;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(.98);
}

.user-menu-options {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 210px;
  padding: 8px;
  border: 1px solid rgba(205, 224, 247, .95);
  border-radius: 16px;
  background: rgba(255, 255, 255, .98);
  box-shadow: 0 16px 36px rgba(42, 91, 157, .18);
  backdrop-filter: blur(10px);
}

.menu-heading {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 8px 12px 11px;
  border-bottom: 1px solid #edf3fb;
}

.menu-heading span {
  color: #315987;
  font-size: 13px;
  font-weight: 700;
}

.menu-heading small {
  color: #9aacc2;
  font-size: 11px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 6px;
}

.menu-items button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 8px 10px;
  border: 0;
  border-radius: 9px;
  color: #34445c;
  background: transparent;
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: color .18s ease, background .18s ease, transform .18s ease;
}

.menu-items button:hover {
  color: #2868bc;
  background: #eef6ff;
  transform: translateX(2px);
}

.menu-icon {
  display: grid;
  flex: 0 0 26px;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  color: #4382d2;
  background: #eaf3ff;
  font-size: 16px;
  line-height: 1;
}

.menu-label {
  flex: 1;
}

.menu-chevron {
  color: #a8bdd6;
  font-size: 19px;
  line-height: 1;
  transition: transform .18s ease;
}

.menu-items button:hover .menu-chevron {
  transform: translateX(2px);
}

.menu-items .logout-action {
  margin-top: 4px;
  border-top: 1px solid #edf3fb;
  border-radius: 0 0 9px 9px;
  color: #d05d6c;
}

.menu-items .logout-action .menu-icon {
  color: #d05d6c;
  background: #fff0f2;
}

.menu-items .logout-action:hover {
  color: #c34758;
  background: #fff3f4;
}

.user-avatar {
  display: grid;
  flex: 0 0 40px;
  place-items: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  color: #fff;
  background: #7da2dc;
  font-size: 16px;
  font-weight: 600;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.user-details strong {
  overflow: hidden;
  color: #34445c;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-details span,
.user-details small {
  overflow: hidden;
  color: #7d8ca5;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-details span {
  margin-top: 3px;
}

.user-details small {
  margin-top: 2px;
  color: #a8b3c1;
}
</style>
