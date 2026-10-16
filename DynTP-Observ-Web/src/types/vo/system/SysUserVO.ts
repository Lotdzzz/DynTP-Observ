/** 用户信息视图对象。 */
export interface SysUserVO {
  /** 用户 ID。 */
  userId: number;
  /** 用户账号。 */
  userName: string;
  /** 用户昵称。 */
  nickName: string;
  /** 用户邮箱。 */
  email: string;
  /** 头像地址。 */
  avatar: string;
  /** 账号状态（0 正常，1 停用）。 */
  status: string;
  /** 最后登录 IP。 */
  loginIp: string;
  /** 最后登录时间。 */
  loginDate: string;
  /** 创建时间。 */
  createTime: string;
  /** 更新时间。 */
  updateTime: string;
  /** 备注。 */
  remark: string;
  /** 用户角色 ID 集合。 */
  roleIds: number[];
}
