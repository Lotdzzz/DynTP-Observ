/** 认证登录日志查询请求参数。 */
export interface SysAuthLogDTO {
    /** 登录账号。 */
    username: string;
    /** 登录类型（LOGIN 登录，LOGOUT 退出）。 */
    loginType: string;
    /** 状态（1 成功，0 失败）。 */
    status: number;
    /** 登录 IP。 */
    ipAddress: string;
    /** IP 归属地。 */
    ipLocation: string;
    /** 登录时间范围开始值。 */
    beginTime: string;
    /** 登录时间范围结束值。 */
    endTime: string;
}
