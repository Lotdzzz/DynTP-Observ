/** 用户新增或修改请求参数。 */
export interface SysUserDTO {
  /** 用户 ID，修改时必填。 */
  userId: number;
  /** 用户账号。 */
  userName: string;
  /** 用户昵称。 */
  nickName: string;
  /** 用户邮箱。 */
  email: string;
  /** 头像地址。 */
  avatar: string;
  /** 用户密码，新增时必填，修改时选填。 */
  password: string;
  /** 账号状态（0 正常，1 停用）。 */
  status: string;
  /** 备注。 */
  remark: string;
  /** 用户角色 ID 集合。 */
  roleIds: number[];
}
