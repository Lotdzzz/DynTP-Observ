<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import UserDisPlayFrame from "../components/UserDisPlayFrame.vue";
import SideMenuItem from "../components/SideMenuItem.vue";
import type {UserInfoVO} from "../types/vo/system/UserInfoVO.ts";
import {useRoute} from "vue-router";
import router from "../router";
import staticRouterConstants from "../constants/staticRouter.ts";
import {userStore} from "../stores/userInfo.ts";
import {loginApi} from "../api/auth/login.ts";

// define collapse value ref
const collapse = ref(false);

// define user info ref
const userInfo = ref<UserInfoVO | null>(null);

// Keep the sidebar profile in sync with changes made in the account center.
const currentUserInfo = computed(() => userStore().userInfo ?? userInfo.value);

// at views initialization, use lifecycle hook
onMounted(async () => {
  // fetch user info from API
  userInfo.value = await loginApi.getUserInfo()

  // set user info into the user store
  userStore().setUserInfo(userInfo.value)
})

// define function that control collapse value
function changeCollapse() {
  collapse.value = !collapse.value;
}

// fetch current route
const route = useRoute()

// define breadcrumbs computed property
const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta.title)
})

// display the index views
function displayIndexViews() {
  void router.push(staticRouterConstants.panel)
}

// welcome views redirect
function redirectToWelcomeViews() {
  void router.push(staticRouterConstants.index)
}

</script>

<template>
  <el-container class="layout-shell">
    <el-aside class="layout-aside" :class="{ 'is-collapsed': collapse }" width="248px">
      <div class="aside-inner">
        <el-button
            class="sidebar-toggle-button"
            type="default"
            circle
            title="折叠侧边栏"
            aria-label="折叠侧边栏"
            @click="changeCollapse"
        >
          <span aria-hidden="true">‹</span>
        </el-button>

        <div class="brand">
          <div class="brand-mark"><span></span><span></span><span></span></div>
          <div>
            <strong>dynTP<span>-Observ</span></strong>
            <small>可观测线程池平台</small>
          </div>
        </div>

        <el-menu
            class="side-menu"
            :default-active="route.path"
            router
            background-color="transparent"
            text-color="#7d8ca5"
            active-text-color="#3778d5"
        >
          <el-menu-item
              :index="staticRouterConstants.panel"
              @click="displayIndexViews"
          >
            <span class="menu-symbol" aria-hidden="true">⌂</span>
            <span class="menu-text">首页</span>
          </el-menu-item>

          <SideMenuItem
              v-for="menu in (userStore().valid?.routers ?? []).filter(item => !item.hidden)"
              :key="menu.name"
              :menu="menu"
          />
        </el-menu>

        <div class="user-display-slot" aria-label="用户展示区域">
          <UserDisPlayFrame v-if="currentUserInfo" :userInfo="currentUserInfo" :collapse="collapse"/>
        </div>
      </div>
    </el-aside>

    <el-container class="content-container">
      <el-header class="content-header" height="70px">
        <el-breadcrumb class="header-breadcrumb" separator="/">
          <el-breadcrumb-item
              v-for="breadcrumb in breadcrumbs"
              :key="breadcrumb.path"
          >
            {{ breadcrumb.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <nav class="header-navigation" aria-label="欢迎页导航">
          <button type="button" @click="redirectToWelcomeViews">核心能力</button>
          <button type="button" @click="redirectToWelcomeViews">技术栈</button>
          <button type="button" @click="redirectToWelcomeViews">项目简介</button>
        </nav>
      </el-header>

      <el-main class="content-main">
        <div class="content-placeholder">
          <RouterView/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
  width: 100%;
  height: 100%;
  margin: 0;
}

:global(body) {
  color: #34445c;
  background: #f7f9fc;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.layout-shell {
  height: 100vh;
  min-height: 0;
  overflow: hidden;
  background: #f7f9fc;
}

.layout-aside {
  position: relative;
  z-index: 10;
  min-width: 0;
  overflow: visible;
  flex: 0 0 248px;
  width: 248px !important;
  border-right: 1px solid #e9eef5;
  background: #fff;
  box-shadow: 5px 0 22px rgba(62, 86, 122, .025);
  transition: flex-basis .3s ease, width .3s ease;
}

.layout-aside.is-collapsed {
  flex-basis: 68px;
  width: 68px !important;
}

.sidebar-toggle-button {
  position: absolute;
  top: 28px;
  right: -12px;
  z-index: 2;
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
  color: #7d8ca5;
  background: #fff;
  box-shadow: 0 2px 8px rgba(62, 86, 122, .12);
  font-size: 20px !important;
  line-height: 1;
  transition: transform .3s ease, color .2s ease, border-color .2s ease;
}

.sidebar-toggle-button:hover,
.sidebar-toggle-button:focus-visible {
  color: #3778d5;
  border-color: #c8daf3;
}

.layout-aside.is-collapsed .sidebar-toggle-button {
  transform: rotate(180deg);
}

.aside-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 28px 16px 18px;
  overflow: visible;
  transition: padding .3s ease;
}

.layout-aside.is-collapsed .aside-inner {
  padding-right: 12px;
  padding-left: 12px;
}

.user-display-slot {
  flex: 0 0 72px;
  min-height: 72px;
  margin-top: auto;
  border: 1px dashed #dce5f0;
  border-radius: 12px;
  background: #fbfcfe;
  transition: margin .3s ease, border-color .3s ease;
}

.layout-aside.is-collapsed .user-display-slot {
  margin-right: 4px;
  margin-left: 4px;
  border-color: transparent;
  background: transparent;
}

.layout-aside.is-collapsed .user-display-slot :deep(.user-display-frame) {
  justify-content: center;
  gap: 0;
  padding: 14px 0;
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.layout-aside.is-collapsed .user-display-slot :deep(.user-details) {
  display: none;
}

.layout-aside.is-collapsed .user-display-slot :deep(.user-avatar) {
  flex-basis: 44px;
  width: 44px;
  height: 44px;
  font-size: 17px;
}

.layout-aside.is-collapsed .user-display-slot :deep(.user-menu-options) {
  right: auto;
  bottom: 0;
  left: calc(100% + 12px);
  width: 210px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 12px;
  white-space: nowrap;
  transition: justify-content .3s ease, padding .3s ease;
}

.layout-aside.is-collapsed .brand {
  justify-content: center;
  padding: 0;
}

.layout-aside.is-collapsed .brand > div:last-child {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: width .3s ease, opacity .2s ease;
}

.brand-mark {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  width: 19px;
  height: 20px;
}

.brand-mark span {
  display: block;
  width: 4px;
  border-radius: 3px;
  background: #5c91df;
}

.brand-mark span:nth-child(1) {
  height: 10px;
  opacity: .65;
}

.brand-mark span:nth-child(2) {
  height: 15px;
  opacity: .82;
}

.brand-mark span:nth-child(3) {
  height: 20px;
}

.brand strong {
  display: block;
  color: #283b58;
  font-size: 16px;
  letter-spacing: -.3px;
}

.brand strong span {
  color: #91a0b3;
  font-weight: 500;
}

.brand small {
  display: block;
  margin-top: 3px;
  color: #a9b4c3;
  font-size: 9px;
}

.side-menu {
  flex: 1;
  min-height: 0;
  width: 100%;
  min-width: 0;
  margin-top: 30px;
  border: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width .3s ease, margin-top .3s ease;
}

.layout-aside.is-collapsed .side-menu {
  align-self: center;
  width: 44px;
  margin-top: 26px;
}

:deep(.el-menu-item) {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 42px;
  margin: 4px 0;
  overflow: hidden;
  padding: 0 13px !important;
  border-radius: 8px;
  font-size: 13px;
  line-height: 42px;
  transition: width .3s ease, padding .3s ease, color .3s ease,
  background-color .3s ease, box-shadow .3s ease;
}

/* 子菜单按层级递进，避免被上面的统一 padding 覆盖后与顶层菜单混在一起。 */
:deep(.el-sub-menu .el-menu-item) {
  padding-left: 38px !important;
}

:deep(.el-sub-menu .el-sub-menu > .el-sub-menu__title) {
  padding-left: 38px !important;
}

:deep(.el-sub-menu .el-sub-menu .el-menu-item) {
  padding-left: 62px !important;
}

:deep(.el-menu-item::before) {
  position: absolute;
  top: 8px;
  left: 1px;
  width: 3px;
  height: 26px;
  border-radius: 0 4px 4px 0;
  background: #4e86d9;
  content: "";
  opacity: 0;
  transform: translateX(-6px) scaleY(.6);
  transform-origin: center;
  transition: opacity .3s ease, transform .3s ease;
}

:deep(.el-menu-item:hover) {
  color: #3778d5 !important;
  background: #f4f8fe !important;
}

:deep(.el-menu-item.is-active) {
  color: #3778d5 !important;
  background: #edf4ff !important;
  box-shadow: inset 0 0 0 1px rgba(78, 134, 217, .12);
}

:deep(.el-menu-item.is-active::before) {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

:deep(.el-menu) {
  border-right: 0;
}

.menu-symbol {
  display: inline-flex;
  flex: 0 0 25px;
  align-items: center;
  justify-content: center;
  width: 25px;
  margin-right: 8px;
  color: #a4b1c1;
  font-size: 17px;
  text-align: center;
  transition: margin .3s ease, color .3s ease, transform .3s ease;
}

.menu-text {
  display: inline-block;
  max-width: 88px;
  overflow: hidden;
  opacity: 1;
  transform: translateX(0);
  white-space: nowrap;
  transition: max-width .3s ease, opacity .2s ease, transform .3s ease;
}

.layout-aside.is-collapsed :deep(.el-menu-item) {
  padding: 0 !important;
}

.layout-aside.is-collapsed .menu-symbol {
  margin-right: 0;
  transform: translateX(10px);
}

.layout-aside.is-collapsed .menu-text {
  max-width: 0;
  opacity: 0;
  transform: translateX(-6px);
}

:deep(.is-active .menu-symbol) {
  color: #4e86d9;
}

.content-container {
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 38px;
  border-bottom: 1px solid #e9eef5;
  background: #fff;
}

.header-navigation {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.header-navigation button {
  padding: 7px 11px;
  border: 0;
  border-radius: 7px;
  color: #7d8ca5;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  transition: color .2s ease, background .2s ease;
}

.header-navigation button:hover,
.header-navigation button:focus-visible {
  color: #3778d5;
  background: #f1f6ff;
  outline: none;
}

.header-breadcrumb {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid #e8eef7;
  border-radius: 10px;
  background: linear-gradient(135deg, #f8fbff 0%, #f3f7fd 100%);
  box-shadow: 0 3px 10px rgba(78, 117, 169, .06);
  min-width: 0;
}

.header-breadcrumb :deep(.el-breadcrumb__inner) {
  color: #a0acbb;
  font-size: 12px;
  letter-spacing: .2px;
  font-weight: 400;
}

.header-breadcrumb :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  padding: 6px 10px;
  border-radius: 7px;
  color: #52647d;
  background: #fff;
  box-shadow: 0 2px 7px rgba(76, 108, 151, .08);
  font-weight: 600;
}

.header-breadcrumb :deep(.el-breadcrumb__separator) {
  margin: 0 9px;
  color: #9eb4d2;
  font-size: 11px;
  font-weight: 400;
}

.content-main {
  min-width: 0;
  min-height: 0;
  padding: 24px;
  overflow: auto;
}

.content-placeholder {
  min-height: 100%;
}

</style>
