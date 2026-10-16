/** 路由元信息。 */
export interface MetaVO {
  /** 页面标题。 */
  title: string;
  /** 页面图标。 */
  icon: string;
  /** 是否缓存页面。 */
  keepAlive: boolean;
  /** 页面权限标识。 */
  perms: string;
  /** 是否为外链。 */
  frame: boolean;
}
