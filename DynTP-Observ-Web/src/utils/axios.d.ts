import 'axios'

/**
 * extend AxiosRequestConfig interface to include skipAuth property for requests
 */
declare module 'axios' {
    export interface AxiosRequestConfig {
        // skip attaching Authorization header for this request
        skipAuth?: boolean
    }
}