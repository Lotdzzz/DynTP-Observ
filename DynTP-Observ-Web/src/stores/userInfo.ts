import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {UserInfoVO} from "../types/vo/system/UserInfoVO.ts";
import type {ValidVO} from "../types/vo/system/ValidVO.ts";

/**
 * useUserStore is a Pinia store for managing user information
 */
export const userStore = defineStore('user', () => {
    // 全局用户信息，未登录时为 null
    const userInfo = ref<UserInfoVO | null>(null)

    // menu tree and role list of current user
    const valid = ref<ValidVO | null>(null)

    // 设置用户信息
    function setUserInfo(info: UserInfoVO) {
        userInfo.value = info
    }

    // 设置用户权限
    function setValid(v: ValidVO) {
        valid.value = v
    }

    // judge valid exists
    function hasValid(): boolean {
        return valid.value !== null && valid.value.routers !== null && valid.value.routers.length > 0
    }

    // 清空用户信息
    function clearUserInfo() {
        userInfo.value = null
    }

    // 暴露状态和方法
    return {
        userInfo,
        setUserInfo,
        clearUserInfo,
        valid,
        setValid,
        hasValid,
    }
})