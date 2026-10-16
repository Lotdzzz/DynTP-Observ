<template>
  <main class="dashboard-page">
    <section class="welcome-card">
      <div class="welcome-copy">
        <span class="section-label">DYNTP OBSERVABILITY</span>
        <h1>让线程池运行状态<br/><em>清晰可见</em></h1>
        <p>
          dyntp-observ 是面向分布式业务系统的线程池可观测与动态管理平台，
          帮助团队更从容地了解系统运行状态，并做出可靠的工程决策。
        </p>
      </div>
      <div class="welcome-orb" aria-hidden="true">
        <span class="orb-ring orb-ring-large"></span>
        <span class="orb-ring orb-ring-small"></span>
        <span class="orb-core"></span>
        <i class="orb-dot orb-dot-one"></i>
        <i class="orb-dot orb-dot-two"></i>
      </div>
    </section>

    <section class="intro-section">
      <div class="section-heading">
        <span class="section-label">ABOUT THE PROJECT</span>
        <h2>从运行现场出发，<br/>建立更清晰的系统视图。</h2>
      </div>
      <p class="intro-text">
        项目围绕线程池的发现、监控与管理展开，通过统一的可视化视图连接业务系统和基础设施。
        从关键运行状态到动态调整能力，让复杂的分布式环境更容易理解，也更容易维护。
      </p>
    </section>

    <section class="feature-section" aria-label="项目能力">
      <article class="feature-card">
        <span class="feature-number">01</span>
        <div class="feature-icon">⌁</div>
        <h3>自动发现</h3>
        <p>接入业务系统中的线程池，减少重复配置，让运行资源更自然地进入观测视野。</p>
      </article>
      <article class="feature-card feature-card-highlight">
        <span class="feature-number">02</span>
        <div class="feature-icon">◌</div>
        <h3>实时观测</h3>
        <p>聚合活跃线程、队列任务和执行状态等信息，帮助快速理解系统当前的运行节奏。</p>
      </article>
      <article class="feature-card">
        <span class="feature-number">03</span>
        <div class="feature-icon">↗</div>
        <h3>动态管理</h3>
        <p>围绕线程池运行参数提供管理能力，让系统调优不再依赖频繁重启和复杂排查。</p>
      </article>
    </section>

  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  color: #2d496b;
  background: #f6faff;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  height: calc(100vh - 118px);
  max-height: calc(100vh - 118px);
  min-height: 0;
  padding: 24px clamp(20px, 3vw, 52px);
  overflow: hidden;
  background:
    radial-gradient(circle at 88% 4%, rgba(188, 220, 255, .42), transparent 27%),
    linear-gradient(145deg, #f9fcff, #f1f7ff);
}

:global(.content-main),
:global(.content-placeholder) {
  min-height: 0;
  overflow: hidden;
}

.welcome-card,
.intro-section,
.feature-section {
  width: min(100%, 1320px);
  margin: 0 auto;
}

.welcome-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 0;
  height: 42%;
  padding: clamp(24px, 3vw, 46px);
  overflow: hidden;
  border: 1px solid #dceafd;
  border-radius: 24px;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 18px 50px rgba(74, 126, 190, .1);
}

.welcome-copy {
  position: relative;
  z-index: 1;
  max-width: 650px;
}

.section-label {
  color: #5c8ed0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin: 12px 0;
  color: #23466f;
  font-size: clamp(30px, 4.2vw, 54px);
  line-height: 1.16;
  letter-spacing: -.04em;
}

h1 em {
  color: #4786d2;
  font-style: normal;
}

.welcome-copy p {
  max-width: 570px;
  margin-bottom: 0;
  color: #7992af;
  font-size: 14px;
  line-height: 1.7;
}

.welcome-orb {
  position: relative;
  flex: 0 0 170px;
  width: 170px;
  height: 170px;
  margin-right: 5%;
}

.orb-ring,
.orb-core {
  position: absolute;
  border-radius: 50%;
}

.orb-ring-large {
  inset: 5px;
  border: 1px solid #bdd8f5;
  transform: rotate(28deg) scaleY(.62);
}

.orb-ring-small {
  inset: 28px;
  border: 1px solid #8fbcf0;
  transform: rotate(-38deg) scaleY(.6);
}

.orb-core {
  inset: 58px;
  background: linear-gradient(135deg, #78b3ef, #3978ca);
  box-shadow: 0 0 0 14px rgba(111, 170, 235, .12), 0 12px 30px rgba(55, 121, 203, .28);
}

.orb-dot {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #5d9de2;
  box-shadow: 0 0 0 6px rgba(93, 157, 226, .12);
}

.orb-dot-one { top: 28px; right: 23px; }
.orb-dot-two { bottom: 35px; left: 22px; background: #a7cdef; }

.intro-section {
  display: grid;
  grid-template-columns: minmax(300px, .85fr) minmax(360px, 1.15fr);
  flex: 0 0 23%;
  gap: clamp(24px, 5vw, 70px);
  padding: 24px 3% 18px;
}

h2 {
  margin: 7px 0 0;
  color: #2a4c73;
  font-size: clamp(25px, 3vw, 38px);
  line-height: 1.2;
  letter-spacing: -.035em;
}

.intro-text,
.technology-copy p {
  align-self: end;
  margin-bottom: 0;
  color: #7c94ae;
  font-size: 14px;
  line-height: 1.65;
}

.feature-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex: 1 1 auto;
  gap: 16px;
  min-height: 0;
}

.feature-card {
  position: relative;
  min-height: 0;
  padding: 24px 26px;
  border: 1px solid #deebfa;
  border-radius: 18px;
  background: rgba(255, 255, 255, .72);
  box-shadow: 0 8px 22px rgba(74, 126, 190, .045);
  transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
}

.feature-card:hover {
  background: #fff;
  box-shadow: 0 14px 30px rgba(61, 117, 180, .12);
  transform: translateY(-5px);
}

.feature-card-highlight {
  border-color: #c7e0fb;
  background: linear-gradient(150deg, #fafdff, #eaf4ff);
}

.feature-number {
  color: #a2bedf;
  font-size: 11px;
  letter-spacing: .08em;
}

.feature-icon {
  margin: 18px 0 12px;
  color: #518bd3;
  font-size: 28px;
}

.feature-card h3 {
  margin-bottom: 10px;
  color: #31577f;
  font-size: 18px;
}

.feature-card p {
  margin-bottom: 0;
  color: #829ab3;
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .dashboard-page {
    padding: 16px;
  }

  .welcome-card {
    height: 38%;
    padding: 24px;
  }

  h1 {
    font-size: 30px;
  }

  .welcome-orb {
    position: absolute;
    right: -45px;
    opacity: .55;
  }

  .intro-section {
    grid-template-columns: 1fr;
    gap: 12px;
    padding-top: 12px;
    padding-bottom: 8px;
    padding-right: 0;
    padding-left: 0;
  }

  .feature-section {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .feature-card {
    min-height: auto;
    padding: 12px 16px;
  }

  .feature-icon {
    margin: 5px 0;
  }

  .feature-card p {
    line-height: 1.35;
  }
}
</style>
