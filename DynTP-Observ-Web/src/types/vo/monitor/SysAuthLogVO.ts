/** 用户认证登录日志视图对象。 */
export interface SysAuthLogVO {
  /** 主键 ID。 */
  id: number;
  /** 登录账号。 */
  username: string;
  /** 登录类型（LOGIN 登录，LOGOUT 退出）。 */
  loginType: string;
  /** 状态（1 成功，0 失败）。 */
  status: number;
  /** 失败原因。 */
  failReason: string;
  /** 登录 IP。 */
  ipAddress: string;
  /** IP 归属地。 */
  ipLocation: string;
  /** 浏览器 User-Agent。 */
  userAgent: string;
  /** JWT Token 唯一标识。 */
  uuidId: string;
  /** 登录时间。 */
  loginTime: string;
  /** 退出时间。 */
  logoutTime: string;
  /** 创建时间。 */
  createTime: string;
}
