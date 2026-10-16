/** 第三方账号绑定视图对象。 */
export interface SysAuthOauthVO {
  /** 第三方账号绑定 ID。 */
  oauthId: number;
  /** 系统用户 ID。 */
  userId: number;
  /** 第三方平台（GitHub、微信、QQ）。 */
  provider: string;
  /** 第三方平台用户唯一 ID。 */
  openId: string;
  /** 第三方平台统一 ID。 */
  unionId: string;
  /** 第三方账号昵称。 */
  oauthName: string;
  /** 第三方账号头像。 */
  oauthAvatar: string;
  /** 第三方账号邮箱。 */
  oauthEmail: string;
  /** 绑定时间。 */
  createTime: string;
  /** 更新时间。 */
  updateTime: string;
  /** 备注。 */
  remark: string;
}
