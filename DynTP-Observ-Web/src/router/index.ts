import {createRouter, createWebHistory} from 'vue-router'
import staticRouterConstants from "../constants/staticRouter.ts";
import tokenUtils from "../utils/token.ts";
import {ISystemService} from "../service/system/ISystemService.ts";
import {ElMessage} from "element-plus";

// 创建路由实例
const router = createRouter({
    // 使用 HTML5 History 模式
    history: createWebHistory(import.meta.env.BASE_URL),

    // 配置路由映射
    routes: [
        {
            // 首页
            path: staticRouterConstants.index,
            name: "index",
            component: () =>
                import('../views/index.vue'),
        },
        {
            // 登录页
            path: staticRouterConstants.login,
            name: "login",
            component: () =>
                import('../views/login.vue'),
        },
        {
            // 布局页面
            path: staticRouterConstants.layout,
            name: "layout",
            redirect: staticRouterConstants.panel, //访问layout时重定向到panel
            component: () =>
                import('../layout/index.vue'),
            children: [
                {
                    // 面板页
                    path: staticRouterConstants.panel,
                    name: "panel",
                    meta: {
                        title: "首页",
                    },
                    component: () =>
                        import('../views/dashboard/index.vue'),
                },
                {
                    // user info page
                    path: staticRouterConstants.userInfo,
                    name: "userInfo",
                    component: () =>
                        import('../views/dashboard/userInfo.vue'),
                },
            ]
        }
    ],
})

/**
 * router daemon
 * at the index page or login page, it will pass
 * nevertheless, if at the other page it needs to check the token and register dynamic routers
 *
 * besides, if at the dynamic page and refreshing the page it will match router tree.
 * at that time, valid of pinia will initialize and dynamic routers will reset
 * consequently, router.beforeEach will register router trees and current route will match the router tree, so it will pass and render the page
 */
router.beforeEach(async (to) => {
    // if the current route is index page or login page, it will pass
    if (to.path === staticRouterConstants.index || to.path === staticRouterConstants.login) {
        return true
    }

    // get token
    const tokenExists = await tokenUtils.exists();

    // if token not exists, redirect to login page or index page
    if (!tokenExists) {
        return staticRouterConstants.login
    }

    // dynamically add routes based on user permissions
    try {
        // register dynamic routers if not registered yet
        const register = await ISystemService.registerDynamicRouter()

        // this returning represents matching current route address
        // if match error, it will retry router.beforeEach
        // provided handler with issue, it will circulate countlessly
        // consequently, must ensure the dynamic routers are registered successfully and the current route address is matched
        if (register) {
            return to.fullPath
        }

        return true

    } catch (error) {
        ElMessage.error(`动态路由初始化失败：${error}`)
        return staticRouterConstants.login
    }

})

// 导出路由实例
export default router