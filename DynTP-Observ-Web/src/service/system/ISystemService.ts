// ISystemService service for system such as router
import {userStore} from "../../stores/userInfo.ts";
import {loginApi} from "../../api/auth/login.ts";
import {transformRoutes} from "../../router/dynamicRouters.ts";
import router from "../../router";

export const ISystemService = {
    // mark whether the dynamic routers are registered
    routerRegistered: false,
    /**
     * register dynamic router trees
     *
     * @return true represents that the first time to register dynamic routers, false represents that the dynamic routers have been registered
     */
    async registerDynamicRouter() {
        // check whether the dynamic routers are registered
        if (ISystemService.routerRegistered) {
            return false
        }

        // fetch menu tree and role list of user
        const valid = await loginApi.getValid()

        // build el-menu trees
        const result = transformRoutes(valid.routers)

        // set dynamic routers into the router
        result.forEach(route => {
            // 避免重复注册
            if (route.name && router.hasRoute(route.name)) {
                throw new Error(`动态路由组件与静态路由组件冲突，路由名称为：${String(route.name)}`)
            }

            router.addRoute(route)
        })

        // set menu tree and role list into the user store
        userStore().setValid(valid)

        // mark that dynamic routers are registered
        ISystemService.routerRegistered = true

        // successfully registered dynamic routers
        return true
    }
}
