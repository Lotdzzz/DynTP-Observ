/** 认证日志请求参数。 */
export interface AuthLogDTO {
    /** 登录账号。 */
    username: string;
    /** 登录类型（LOGIN 登录，LOGOUT 退出）。 */
    loginType: string;
    /** 状态（1 成功，0 失败）。 */
    status: number;
    /** 设备指纹。 */
    userAgent: string;
    /** 登录 IP。 */
    ipAddress: string;
    /** IP 归属地。 */
    ipLocation: string;
    /** 错误原因。 */
    failReason: string;
    /** 退出时间。 */
    logoutTime: string;
}
