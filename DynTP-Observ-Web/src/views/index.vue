<script setup lang="ts">
import {useRouter} from 'vue-router'
import staticRouterConstants from "../constants/staticRouter.ts";
import tokenUtils from "../utils/token.ts";
const router = useRouter()

// 定义登录页跳转
async function goToConsole() {
  // judge localstorage token if exists push to layout panel, else push to login page
  const exists = await tokenUtils.exists()
  if (exists) {
    router.push(staticRouterConstants.panel)
    return
  }
  router.push(staticRouterConstants.login)
}
</script>

<template>
  <div class="home-page">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="dyntp-observ 首页">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="brand-name">dyntp<span>-observ</span></span>
      </a>

      <nav class="header-nav" aria-label="页面导航">
        <a href="#capabilities">核心能力</a>
        <a href="#architecture">技术栈</a>
        <a href="#about">项目简介</a>
      </nav>

      <el-button class="console-button" type="primary" @click="goToConsole">
        进入后台
        <span aria-hidden="true">↗</span>
      </el-button>
    </header>

    <main id="top">
      <section class="hero-section">
        <div class="hero-copy">
          <div class="eyebrow"><span></span> DISTRIBUTED THREAD POOL OBSERVABILITY</div>
          <h1>让每一个线程池<br/><em>都清晰可见</em></h1>
          <p class="hero-description">
            面向分布式业务系统的线程池可观测与动态管理平台。<br/>
            从自动发现到运行时调参，让系统始终保持在可控状态。
          </p>
          <div class="hero-meta">
            <span><b class="live-dot"></b>服务状态正常</span>
            <span class="meta-divider"></span>
            <span>Java 17+ · Spring Boot</span>
          </div>
        </div>

        <div class="hero-visual" aria-label="线程池实时运行概览">
          <div class="visual-heading"><span>运行概览</span><span class="visual-time">LIVE · 10:24:36</span></div>
          <div class="metric-grid">
            <div class="metric-card metric-card-wide"><span
                class="metric-label">活跃线程</span><strong>128</strong><span class="metric-change">+12.4%</span>
              <div class="mini-bars" aria-hidden="true">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="metric-card"><span class="metric-label">队列积压</span><strong>2,481</strong><span
                class="metric-unit">tasks</span>
              <div class="metric-line" aria-hidden="true"></div>
            </div>
            <div class="metric-card"><span class="metric-label">任务吞吐</span><strong>8.6k</strong><span
                class="metric-unit">/ min</span>
              <div class="metric-line metric-line-short" aria-hidden="true"></div>
            </div>
          </div>
          <div class="visual-footer"><span><i class="status-dot"></i> 12 个服务实例在线</span><span>刷新间隔 5s</span>
          </div>
        </div>
      </section>

      <section id="capabilities" class="content-section capabilities-section">
        <div class="section-intro"><span class="section-index">01</span>
          <div><p class="section-kicker">CAPABILITIES</p>
            <h2>从发现到决策，<br/>掌握线程池的每一次变化。</h2></div>
        </div>
        <div class="capability-list">
          <article class="capability-item"><span class="item-number">01</span>
            <div><h3>无侵入接入</h3>
              <p>引入 Spring Boot Starter，自动发现并接管 Spring 管理的线程池。</p></div>
          </article>
          <article class="capability-item"><span class="item-number">02</span>
            <div><h3>实时监控</h3>
              <p>持续采集活跃线程、队列积压、任务执行等关键运行指标。</p></div>
          </article>
          <article class="capability-item"><span class="item-number">03</span>
            <div><h3>动态调参</h3>
              <p>运行时调整核心线程数、最大线程数，无需重启业务服务。</p></div>
          </article>
          <article class="capability-item"><span class="item-number">04</span>
            <div><h3>智能告警</h3>
              <p>在线识别线程池饱和、任务拒绝与队列积压等异常状态。</p></div>
          </article>
          <article class="capability-item"><span class="item-number">05</span>
            <div><h3>分布式管理</h3>
              <p>统一管理多个微服务实例中的线程池，建立全局运行视图。</p></div>
          </article>
          <article class="capability-item"><span class="item-number">06</span>
            <div><h3>可视化分析</h3>
              <p>展示运行状态、历史趋势及性能指标，辅助定位系统瓶颈。</p></div>
          </article>
        </div>
      </section>

      <section id="architecture" class="architecture-section">
        <div class="architecture-heading">
          <div><p class="section-kicker">BUILT FOR DEPTH</p>
            <h2>从 JUC 原理出发，<br/>构建可观测性基础设施。</h2></div>
          <p>深入线程池原理与 Spring Boot 自动装配机制，连接业务运行现场与工程决策。</p></div>
        <div class="tech-strip"><span>Java 17+</span><i></i><span>Spring Boot</span><i></i><span>JUC</span><i></i><span>Starter SDK</span><i></i><span>MySQL</span><i></i><span>Redis</span><i></i><span>Prometheus</span><i></i><span>Vue 3</span><i></i><span>ECharts</span>
        </div>
      </section>

      <section id="about" class="about-section">
        <div class="about-label"><span class="section-index">02</span>
          <p class="section-kicker">ABOUT THE PROJECT</p></div>
        <p class="about-copy">dyntp-observ 是一个面向分布式系统的线程池监控与动态管理平台，通过自研 SDK
          将线程池的运行状态、异常信号与管理动作，汇聚为一套清晰、可靠的工程视图。</p></section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">dyntp<span>-observ</span></div>
      <p>分布式线程池可观测与动态管理平台</p>
      <div class="footer-links"><a href="#about">关于项目</a><a href="#top">返回顶部 ↑</a></div>
      <div class="footer-bottom"><span>© 2026 dyntp-observ. All rights reserved.</span><span>粤ICP备 00000000号 · 粤公网安备 00000000000000号</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  background: #fcfdfe;
  color: #26343c;
  font-family: 'Noto Sans SC', 'MiSans', 'PingFang SC', 'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

a {
  color: inherit;
  text-decoration: none;
}

.home-page {
  overflow: hidden;
  background: #fcfdfe;
}

@keyframes page-section-reveal {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.site-header,
.hero-copy,
.hero-visual,
.capabilities-section,
.architecture-section,
.about-section,
.site-footer {
  animation: page-section-reveal .7s cubic-bezier(.22, .61, .36, 1) both;
}

.site-header {
  animation-delay: .05s;
}

.hero-copy {
  animation-delay: .15s;
}

.hero-visual {
  animation-delay: .28s;
}

.capabilities-section {
  animation-delay: .42s;
}

.architecture-section {
  animation-delay: .56s;
}

.about-section {
  animation-delay: .7s;
}

.site-footer {
  animation-delay: .84s;
}

.capability-item {
  animation: page-section-reveal .55s cubic-bezier(.22, .61, .36, 1) both;
}

.capability-item:nth-child(1) {
  animation-delay: .52s;
}

.capability-item:nth-child(2) {
  animation-delay: .6s;
}

.capability-item:nth-child(3) {
  animation-delay: .68s;
}

.capability-item:nth-child(4) {
  animation-delay: .76s;
}

.capability-item:nth-child(5) {
  animation-delay: .84s;
}

.capability-item:nth-child(6) {
  animation-delay: .92s;
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .hero-copy,
  .hero-visual,
  .capabilities-section,
  .architecture-section,
  .about-section,
  .site-footer,
  .capability-item {
    animation: none;
  }
}

.site-header {
  align-items: center;
  border-bottom: 1px solid #eef2f4;
  display: flex;
  height: 78px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 42px;
}

.brand, .footer-brand {
  align-items: center;
  display: flex;
  font-family: 'DM Sans', 'Noto Sans SC', sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -.2px;
}

.brand span span, .footer-brand span {
  color: #7c8991;
  font-weight: 500;
}

.brand-mark {
  align-items: flex-end;
  display: flex;
  gap: 2px;
  height: 17px;
  margin-right: 10px;
}

.brand-mark i {
  background: #2369d8;
  display: block;
  height: 9px;
  width: 3px;
}

.brand-mark i:nth-child(2) {
  height: 14px;
}

.brand-mark i:nth-child(3) {
  height: 17px;
}

.header-nav {
  display: flex;
  gap: 30px;
  margin-left: auto;
  margin-right: 40px;
}

.header-nav a, .footer-links a {
  color: #6e7b83;
  font-size: 12px;
  transition: color .2s ease;
}

.header-nav a:hover, .footer-links a:hover {
  color: #2369d8;
}

:deep(.console-button.el-button) {
  background: #3678d8;
  border: 0;
  border-radius: 9px;
  box-shadow: 0 7px 18px rgba(54, 120, 216, .16);
  color: #fff;
  cursor: pointer;
  font: 600 12px 'DM Sans', 'Noto Sans SC', sans-serif;
  height: auto;
  padding: 12px 16px;
  transition: background .2s ease, box-shadow .2s ease, transform .2s ease;
}

.console-button.el-button:hover {
  background: #286bcf;
  border-color: #286bcf;
  box-shadow: 0 9px 22px rgba(54, 120, 216, .22);
  color: #fff;
  transform: translateY(-1px);
}

.console-button span {
  font-size: 15px;
  margin-left: 10px;
}

.hero-section {
  display: grid;
  gap: 7vw;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 500px);
  margin: 0 auto;
  max-width: 1320px;
  min-height: 570px;
  padding: 110px 42px 100px;
}

.eyebrow, .section-kicker, .section-index, .visual-time, .metric-label, .item-number, .footer-bottom {
  font-family: 'DM Mono', monospace;
}

.eyebrow {
  align-items: center;
  color: #829099;
  display: flex;
  font-size: 10px;
  letter-spacing: 1.4px;
  margin-bottom: 25px;
}

.eyebrow span {
  background: #2369d8;
  height: 6px;
  margin-right: 9px;
  width: 6px;
}

.hero-copy h1 {
  color: #26343c;
  font-family: 'DM Sans', 'Noto Sans SC', sans-serif;
  font-size: clamp(46px, 5.1vw, 76px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.12;
  margin: 0;
}

.hero-copy h1 em {
  color: #3678d8;
  font-style: normal;
}

.hero-description {
  color: #718087;
  font-size: 14px;
  font-weight: 400;
  line-height: 2;
  margin: 27px 0 34px;
}

.hero-meta {
  align-items: center;
  color: #7b888e;
  display: flex;
  font: 11px 'DM Mono', monospace;
  gap: 11px;
}

.live-dot, .status-dot {
  background: #50af83;
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  margin-right: 6px;
  width: 6px;
}

.meta-divider {
  background: #dfe6e9;
  height: 13px;
  width: 1px;
}

.hero-visual {
  align-self: center;
  background: #f7fafc;
  border: 1px solid #e9eff2;
  border-radius: 22px;
  box-shadow: 0 16px 40px rgba(48, 72, 91, .07);
  padding: 22px;
}

.visual-heading, .visual-footer {
  align-items: center;
  color: #405058;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
}

.visual-time {
  color: #97a3a8;
  font-size: 9px;
}

.metric-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin: 17px 0;
}

.metric-card {
  background: rgba(255, 255, 255, .9);
  border: 1px solid #edf2f4;
  border-radius: 14px;
  box-shadow: 0 5px 16px rgba(48, 72, 91, .035);
  min-height: 133px;
  padding: 17px;
  position: relative;
}

.metric-card-wide {
  grid-column: span 2;
  min-height: 153px;
}

.metric-label {
  color: #929ea3;
  display: block;
  font-size: 9px;
  letter-spacing: .2px;
  margin-bottom: 10px;
}

.metric-card strong {
  color: #304047;
  font-size: 29px;
  letter-spacing: -1px;
}

.metric-change {
  color: #50af83;
  font: 10px 'DM Mono', monospace;
  margin-left: 9px;
}

.metric-unit {
  color: #a1acb0;
  font: 9px 'DM Mono', monospace;
  margin-left: 4px;
}

.mini-bars {
  align-items: flex-end;
  bottom: 18px;
  display: flex;
  gap: 4px;
  height: 34px;
  position: absolute;
  right: 17px;
}

.mini-bars i {
  background: #b6d0f4;
  display: block;
  width: 9px;
}

.mini-bars i:nth-child(2), .mini-bars i:nth-child(7) {
  height: 19px;
}

.mini-bars i:nth-child(1), .mini-bars i:nth-child(4), .mini-bars i:nth-child(9) {
  height: 26px;
}

.mini-bars i:nth-child(3), .mini-bars i:nth-child(6) {
  height: 13px;
}

.mini-bars i:nth-child(5), .mini-bars i:nth-child(8), .mini-bars i:nth-child(10) {
  background: #5b91dc;
  height: 33px;
}

.metric-line {
  background: #edf3fb;
  height: 3px;
  margin-top: 20px;
  position: relative;
}

.metric-line::after {
  background: #75a4e2;
  content: '';
  display: block;
  height: 3px;
  width: 64%;
}

.metric-line-short::after {
  width: 43%;
}

.visual-footer {
  border-top: 1px solid #e8eef0;
  color: #97a3a8;
  font: 9px 'DM Mono', monospace;
  padding-top: 16px;
}

.status-dot {
  background: #50af83;
  height: 5px;
  width: 5px;
}

.content-section, .architecture-section, .about-section {
  margin: 0 auto;
  max-width: 1320px;
  padding-left: 42px;
  padding-right: 42px;
}

.capabilities-section {
  border-top: 1px solid #eef2f4;
  display: grid;
  gap: 9vw;
  grid-template-columns: .85fr 1.15fr;
  padding-bottom: 120px;
  padding-top: 105px;
}

.section-intro {
  display: flex;
  gap: 38px;
}

.section-index {
  color: #3678d8;
  font-size: 11px;
  padding-top: 4px;
}

.section-kicker {
  color: #929ea3;
  font-size: 10px;
  letter-spacing: 1.4px;
  margin: 0 0 18px;
}

h2 {
  color: #34434a;
  font-size: clamp(25px, 3vw, 39px);
  font-weight: 700;
  letter-spacing: -1.4px;
  line-height: 1.3;
  margin: 0;
}

.capability-list {
  border-top: 1px solid #e9eff2;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.capability-item {
  border-bottom: 1px solid #e9eff2;
  display: flex;
  gap: 18px;
  min-height: 141px;
  padding: 24px 18px 20px 0;
}

.capability-item:nth-child(odd) {
  border-right: 1px solid #e9eff2;
  padding-right: 24px;
}

.capability-item:nth-child(even) {
  padding-left: 24px;
}

.item-number {
  color: #aab5b9;
  font-size: 10px;
}

.capability-item h3 {
  color: #46565d;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px;
}

.capability-item p {
  color: #7d8a90;
  font-size: 12px;
  line-height: 1.8;
  margin: 0;
}

.architecture-section {
  background: #f7fafc;
  max-width: none;
  padding-bottom: 80px;
  padding-top: 95px;
}

.architecture-heading {
  display: flex;
  justify-content: space-between;
  margin: 0 auto 75px;
  max-width: 1236px;
}

.architecture-heading > p {
  color: #7d8a90;
  font-size: 13px;
  line-height: 1.9;
  max-width: 285px;
  padding-top: 29px;
}

.tech-strip {
  align-items: center;
  color: #55646b;
  display: flex;
  flex-wrap: wrap;
  font: 11px 'DM Mono', monospace;
  gap: 18px;
  justify-content: center;
  margin: auto;
  max-width: 1236px;
}

.tech-strip i {
  background: #cbd5d9;
  border-radius: 50%;
  height: 3px;
  width: 3px;
}

.about-section {
  align-items: flex-start;
  border-bottom: 1px solid #eef2f4;
  display: grid;
  gap: 9vw;
  grid-template-columns: .85fr 1.15fr;
  padding-bottom: 110px;
  padding-top: 105px;
}

.about-label {
  display: flex;
  gap: 38px;
}

.about-copy {
  color: #64737a;
  font-size: 22px;
  letter-spacing: -.4px;
  line-height: 1.7;
  margin: 0;
  max-width: 710px;
}

.site-footer {
  margin: 0 auto;
  max-width: 1320px;
  padding: 47px 42px 25px;
}

.footer-brand {
  margin-bottom: 11px;
}

.site-footer > p {
  color: #929ea3;
  font-size: 11px;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 23px;
  margin: 27px 0 55px;
}

.footer-bottom {
  border-top: 1px solid #eef2f4;
  color: #a5afb3;
  display: flex;
  font-size: 9px;
  justify-content: space-between;
  padding-top: 18px;
}

@media (max-width: 800px) {
  .site-header {
    height: 68px;
    padding: 0 22px;
  }

  .header-nav {
    display: none;
  }

  .hero-section {
    display: block;
    min-height: auto;
    padding: 78px 22px 72px;
  }

  .hero-visual {
    margin-top: 62px;
  }

  .content-section, .about-section {
    padding-left: 22px;
    padding-right: 22px;
  }

  .capabilities-section, .about-section {
    display: block;
    padding-bottom: 75px;
    padding-top: 72px;
  }

  .section-intro, .about-label {
    gap: 20px;
    margin-bottom: 45px;
  }

  .capability-item {
    min-height: 155px;
  }

  .architecture-section {
    padding: 72px 22px;
  }

  .architecture-heading {
    display: block;
    margin-bottom: 48px;
  }

  .architecture-heading > p {
    padding-top: 25px;
  }

  .tech-strip {
    justify-content: flex-start;
    line-height: 2;
  }

  .about-copy {
    font-size: 19px;
  }

  .site-footer {
    padding: 38px 22px 22px;
  }

  .footer-links {
    margin-bottom: 38px;
  }

  .footer-bottom {
    display: block;
    line-height: 2.1;
  }

  .footer-bottom span {
    display: block;
  }
}

@media (max-width: 480px) {
  h1 {
    letter-spacing: -2.5px;
  }

  .hero-description {
    font-size: 13px;
  }

  .metric-card {
    padding: 13px;
  }

  .metric-card strong {
    font-size: 24px;
  }

  .metric-change {
    display: block;
    margin: 5px 0 0;
  }

  .metric-card-wide .metric-change {
    display: inline;
    margin-left: 7px;
  }

  .capability-list {
    display: block;
  }

  .capability-item:nth-child(odd) {
    border-right: 0;
    padding-right: 0;
  }

  .capability-item:nth-child(even) {
    padding-left: 0;
  }

  .hero-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .meta-divider {
    display: none;
  }
}
</style>
