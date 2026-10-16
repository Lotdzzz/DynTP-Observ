<script lang="ts" setup>
import {reactive} from "vue";
import type {LoginBodyDTO} from "../types/dto/login/LoginBodyDTO.ts";
import {loginApi} from "../api/auth/login.ts";
import type {LoginVO} from "../types/vo/system/LoginVO.ts";
import tokenUtils from "../utils/token.ts";
import {ElMessage} from "element-plus";
import router from "../router";
import staticRouterConstants from "../constants/staticRouter.ts";

// creating a reactive value that has type limit
const loginForm = reactive<LoginBodyDTO>({
  username: "",
  password: ""
})

/**
 * login event
 */
async function login(): Promise<void> {
  // call the login service to fetch token
  const response: LoginVO = await loginApi.login(loginForm);

  // it will be stored in localStorage
  tokenUtils.set(response.token);

  // notice the user that login is successful
  ElMessage.success('登录成功')

  // redirect to the home page
  router.replace(staticRouterConstants.panel)
}

// redirect to index page
function goToIndex() {
  router.push(staticRouterConstants.index)
}
</script>

<template>
  <main class="login-page">
    <section class="brand-panel" aria-label="产品介绍">
      <div class="brand-content">
        <div class="brand-logo" aria-hidden="true">
          <span class="logo-orbit logo-orbit--outer"></span>
          <span class="logo-orbit logo-orbit--inner"></span>
          <span class="logo-core"></span>
        </div>
        <p class="brand-kicker">DYNTP OBSERVABILITY</p>
        <h1>让每一次观测<br/>都清晰可见</h1>
        <p class="brand-description">
          统一监控与分析平台，帮助团队快速洞察系统状态，持续提升服务稳定性。
        </p>
      </div>
      <div class="brand-decoration brand-decoration--top"></div>
      <div class="brand-decoration brand-decoration--bottom"></div>
    </section>

    <div class="panel-divider" aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#263f94"/>
            <stop offset="52%" stop-color="#4167d2"/>
            <stop offset="100%" stop-color="#6289ec"/>
          </linearGradient>
          <linearGradient id="divider-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7f9cf2"/>
            <stop offset="48%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#b9c9ff"/>
          </linearGradient>
        </defs>
        <path class="brand-background" d="M 0 0 H 70 C 65 260, 75 740, 70 1000 H 0 Z"/>
        <path class="form-background" d="M 70 0 C 65 260, 75 740, 70 1000 H 100 V 0 Z"/>
        <path class="divider-shadow" d="M 70 0 C 65 260, 75 740, 70 1000"/>
        <path class="divider-line" d="M 70 0 C 65 260, 75 740, 70 1000"/>
      </svg>
    </div>

    <section class="form-panel" aria-label="登录">
      <div class="login-card">
        <div class="mobile-logo" aria-hidden="true">
          <span class="logo-orbit logo-orbit--outer"></span>
          <span class="logo-orbit logo-orbit--inner"></span>
          <span class="logo-core"></span>
        </div>
        <div class="form-heading">
          <p class="form-kicker">WELCOME BACK</p>
          <h2>欢迎登录</h2>
          <p>登录您的账户，开始使用观测平台</p>
        </div>

        <form class="login-form" @submit.prevent="login">
          <label class="field">
            <span>账号</span>
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
              </svg>
              <input type="text" v-model="loginForm.username" name="username" placeholder="请输入账号"
                     autocomplete="username"/>
            </div>
          </label>

          <label class="field">
            <span>密码</span>
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2"/>
                <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
              </svg>
              <input type="password" v-model="loginForm.password" name="password" placeholder="请输入密码"
                     autocomplete="current-password"/>
            </div>
          </label>

          <button type="submit" class="login-button">登 录</button>
        </form>

        <button
            type="button"
            class="back-to-index"
            @click="goToIndex"
        >
          ← 返回展览页
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  color: #18233d;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: #fff;
}

.login-page {
  position: relative;
  display: flex;
  min-height: 100vh;
  background: #fff;
}

.brand-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  min-height: 100vh;
  overflow: hidden;
  color: #fff;
  background: transparent;
}

.brand-panel::before,
.brand-panel::after {
  position: absolute;
  content: "";
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);
}

.brand-panel::before {
  top: 13%;
  left: 16%;
  width: 180px;
  height: 180px;
  background: rgba(151, 187, 255, 0.16);
  animation: float-light 10s ease-in-out infinite;
}

.brand-panel::after {
  right: 10%;
  bottom: 12%;
  width: 260px;
  height: 260px;
  background: rgba(139, 170, 255, 0.12);
  animation: float-light 13s ease-in-out -4s infinite reverse;
}

.brand-content {
  position: relative;
  z-index: 1;
  width: min(600px, 70%);
  animation: content-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.brand-logo,
.mobile-logo {
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 30px;
}

.logo-orbit,
.logo-core {
  position: absolute;
  display: block;
  border-radius: 50%;
}

.logo-orbit {
  border: 2px solid currentColor;
  transform: rotate(-35deg);
}

.logo-orbit--outer {
  inset: 5px 13px;
}

.logo-orbit--inner {
  inset: 13px 5px;
  opacity: 0.65;
  transform: rotate(35deg);
}

.logo-core {
  inset: 27px;
  background: currentColor;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.16);
}

.brand-kicker,
.form-kicker {
  margin: 0 0 17px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.brand-kicker {
  color: rgba(255, 255, 255, 0.72);
}

.brand-content h1 {
  margin: 0;
  font-size: clamp(36px, 4.2vw, 64px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.04em;
}

.brand-description {
  max-width: 430px;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 16px;
  line-height: 1.9;
}

.brand-decoration {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  pointer-events: none;
}

.brand-decoration--top {
  top: -170px;
  right: -100px;
  width: 520px;
  height: 520px;
  animation: decoration-drift 16s ease-in-out infinite;
}

.brand-decoration--bottom {
  bottom: -260px;
  left: -180px;
  width: 600px;
  height: 600px;
  animation: decoration-drift 19s ease-in-out -7s infinite reverse;
}

.panel-divider {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.panel-divider svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.divider-shadow,
.divider-line {
  fill: none;
  stroke-linecap: round;
}

.brand-background {
  fill: url("#brand-gradient");
}

.form-background {
  fill: #fff;
}

.divider-shadow {
  stroke: rgba(47, 79, 170, 0.18);
  stroke-width: 0.3;
}

.divider-line {
  stroke: url("#divider-gradient");
  stroke-width: 0.14;
}

.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  min-width: 310px;
  padding: 40px clamp(28px, 4vw, 64px);
  position: relative;
  z-index: 1;
  background: transparent;
}

.login-card {
  width: 100%;
  max-width: 360px;
  padding: 38px 34px;
  border: 1px solid rgba(225, 230, 241, 0.8);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 55px rgba(45, 64, 116, 0.08);
  animation: card-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.mobile-logo {
  display: none;
  color: #4167d2;
}

.form-heading h2 {
  margin: 0;
  color: #18233d;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.form-heading p:last-child {
  margin: 12px 0 34px;
  color: #8c96aa;
  font-size: 13px;
}

.form-kicker {
  margin-bottom: 10px;
  color: #4167d2;
  font-size: 11px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: #59647c;
  font-size: 13px;
  font-weight: 600;
}

.input-wrapper {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 14px;
  border: 1px solid #e2e6ef;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.68);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.input-wrapper:focus-within {
  border-color: #4167d2;
  box-shadow: 0 0 0 3px rgba(65, 103, 210, 0.1);
  transform: translateY(-1px);
}

.input-wrapper svg {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  fill: none;
  stroke: #a9b1c0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.input-wrapper input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: #18233d;
  font: inherit;
  font-size: 14px;
}

.input-wrapper input::placeholder {
  color: #b4bbc8;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -3px;
  color: #8c96aa;
  font-size: 12px;
}

.remember-option {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

.remember-option input {
  position: absolute;
  opacity: 0;
}

.checkbox {
  width: 14px;
  height: 14px;
  border: 1px solid #d5dbe6;
  border-radius: 3px;
}

.remember-option input:checked + .checkbox {
  border-color: #4167d2;
  background: #4167d2;
  box-shadow: inset 0 0 0 3px #fff;
}

.forgot-link,
.login-footer a {
  color: #4167d2;
  text-decoration: none;
}

.login-button {
  height: 48px;
  margin-top: 5px;
  border: 0;
  border-radius: 13px;
  color: #fff;
  background: #4167d2;
  box-shadow: 0 7px 15px rgba(65, 103, 210, 0.2);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3em;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
}

.login-button:hover {
  background: #3459c0;
  box-shadow: 0 10px 22px rgba(65, 103, 210, 0.28);
  transform: translateY(-2px);
}

.back-to-index {
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 8px 0;
  border: 0;
  color: #7d8aa5;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  transition: color 0.2s, transform 0.2s;
}

.back-to-index:hover {
  color: #4167d2;
  transform: translateX(-3px);
}

.login-footer {
  margin: 28px 0 0;
  color: #a1a9b8;
  font-size: 12px;
  text-align: center;
}

@keyframes float-light {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(24px, -18px, 0) scale(1.08);
  }
}

@keyframes decoration-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(12px, 10px, 0) rotate(8deg);
  }
}

@keyframes content-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-rise {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-panel::before,
  .brand-panel::after,
  .brand-content,
  .brand-decoration,
  .login-card {
    animation: none;
  }
}

@media (max-width: 900px) {
  .brand-content {
    width: 80%;
  }

  .form-panel {
    min-width: 290px;
    padding: 28px;
  }
}

@media (max-width: 680px) {
  .login-page {
    display: block;
  }

  .brand-panel {
    width: 100%;
    min-height: 230px;
    padding: 35px 28px;
    background: linear-gradient(135deg, #263f94 0%, #4167d2 52%, #6289ec 100%);
  }

  .brand-content {
    width: 100%;
  }

  .brand-logo {
    display: none;
  }

  .brand-kicker {
    margin-bottom: 10px;
    font-size: 10px;
  }

  .brand-content h1 {
    font-size: 30px;
  }

  .brand-description {
    display: none;
  }

  .form-panel {
    width: 100%;
    min-width: 0;
    padding: 44px 28px;
    background: #fff;
  }

  .panel-divider {
    display: none;
  }

  .mobile-logo {
    display: block;
    width: 52px;
    height: 52px;
    margin: 0 auto 25px;
  }

  .login-card {
    padding: 32px 26px;
  }

  .mobile-logo .logo-core {
    inset: 19px;
  }

  .mobile-logo .logo-orbit--outer {
    inset: 3px 9px;
  }

  .mobile-logo .logo-orbit--inner {
    inset: 9px 3px;
  }
}
</style>
