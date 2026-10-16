/** 登录服务请求参数。 */
export interface LoginRequestDTO {
    /** 用户名。 */
    username: string;
    /** 用户密码。 */
    password: string;
    /** 用户设备指纹。 */
    userAgent: string;
    /** 用户真实 IP。 */
    ip: string;
}
