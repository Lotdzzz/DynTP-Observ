/** 当前用户基础信息。 */
export interface UserInfoVO {
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
}
