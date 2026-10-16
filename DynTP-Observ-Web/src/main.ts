// 导入 Vue 应用创建函数
import {createApp} from 'vue'

// 导入根组件
import App from './App.vue'

// 导入 Pinia 状态管理
import {createPinia} from 'pinia'

// 导入 Vue Router 路由实例
import router from './router'

// 导入 Element Plus UI 组件库及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ISystemService} from "./service/system/ISystemService.ts";
import {tokenApi} from "./api/system/token.ts";
import tokenUtils from "./utils/token.ts";

// 创建 Vue 应用实例
const app = createApp(App)

// 注册 Pinia 状态管理
app.use(createPinia())

// before register router, register dynamic routers first
// if not do this,at first time dynamic routers match router list will be empty, then to.pullpath, consequently successfully
const exists = await tokenApi.tokenExists({token: tokenUtils.get() || ''})
if (exists) {
    await ISystemService.registerDynamicRouter()
}

// 注册 Vue Router 路由
app.use(router)

// 全局注册 Element Plus 组件库
app.use(ElementPlus)

// 将 Vue 应用挂载到 index.html 中的 #app 节点
app.mount('#app')
