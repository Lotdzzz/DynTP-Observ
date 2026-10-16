import axios from 'axios'
import router from "../router";
import staticRouterConstants from "../constants/staticRouter.ts";
import type {Result} from "../types/model/Result.ts";
import {tokenConstants} from "../constants/tokenConstants.ts";
import {ElMessage} from "element-plus";
import responseStatusConstants from "../constants/responseStatusConstants.ts";

// 配置跨域问题
const request = axios.create({
    baseURL: '/api',
    timeout: 10000,
    // default false
    skipAuth: false
})

// 注册请求拦截器
request.interceptors.request.use(
    (config) => {
        // judge the skipAuth property in the request config
        if (config.skipAuth) {
            return config // skip attaching Authorization header for this request
        }

        // fetch local token from localStorage
        const token = localStorage.getItem(tokenConstants.TOKEN_STORAGE_KEY)

        if (!token) {
            // token is not found, consequently redirect to login page
            void router.replace(staticRouterConstants.login)
        }

        // attach token to Authorization header
        config.headers.Authorization = `${tokenConstants.AUTHORIZATION_HEADER_PREFIX} ${token}`

        return config // 必须返回请求配置
    }
)

// 注册响应拦截器
request.interceptors.response.use(
    (response) => {
        // fetch response object
        const result = response.data as Result<any>

        // judge the response code
        if (result.code === responseStatusConstants.success) {
            return result.data
        }

        // notice user about the error
        ElMessage.error(result.msg)

        // return error msg
        // this exception will be caught by the api caller
        // this exception is sent by the backend with code = 200,therefore it is backend service error
        return Promise.reject(new Error(result.msg || '请求失败'))
    },
    // this exception is sent by the backend with code != 200,therefore it is HTTP error
    (error) => {
        ElMessage.error("HTTP请求失败，请检查网络或联系管理员")

        // 将错误继续抛给调用方处理
        return Promise.reject(error)
    }
)

export default request;