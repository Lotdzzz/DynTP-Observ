// 自动收集 views 目录下所有 Vue 页面
import {type RouteRecordRaw, RouterView} from "vue-router";
import type {RouterVO} from "../types/vo/system/RouterVO.ts";
import {ElMessage} from "element-plus";

// 自动扫描 views 下的 Vue 页面
const modules = import.meta.glob('../views/**/*.vue')

// 后端组件标识转换为 Vue 组件
function resolveComponent(component: string) {
    // 目录节点：使用 RouterView 承载子路由
    if (!component || component === 'ParentView') {
        return RouterView
    }

    // Layout 组件单独处理
    if (component === 'Layout') {
        return () => import('../layout/index.vue')
    }

    // 例如 monitor/threadPool/index -> ../views/monitor/threadPool/index.vue
    const path = `../views/${component.replace(/^\/+/, '').replace(/\.vue$/, '')}.vue`
    const loader = modules[path]

    if (!loader) {
        ElMessage.error(`动态路由组件不存在：${path}`)
    }

    return loader
}

// 将后端 RouterVO[] 转换为 Vue Router 路由
export function transformRoutes(
    routeTree: RouterVO[]
): RouteRecordRaw[] {
    return routeTree.map(route => {
        return {
            path: route.path,
            name: route.name,
            component: resolveComponent(route.component),

            // 空字符串不设置重定向
            // noRedirect 是后端用于目录节点的标记，不能作为 Vue Router 地址注册。
            ...(route.redirect && route.redirect !== 'noRedirect'
                ? {redirect: route.redirect}
                : {}),

            // 映射路由元信息
            meta: {
                title: route.meta.title,
                icon: route.meta.icon,
                keepAlive: route.meta.keepAlive,
                perms: route.meta.perms,
                frame: route.meta.frame,
                hidden: route.hidden,
                alwaysShow: route.alwaysShow,
                requiresAuth: true,
            },

            // 递归转换子路由
            children: transformRoutes(route.children ?? []),
        } as RouteRecordRaw
    })
}
