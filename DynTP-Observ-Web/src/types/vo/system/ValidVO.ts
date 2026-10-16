import type { RouterVO } from './RouterVO';

/** 当前用户权限、角色和路由信息。 */
export interface ValidVO {
  /** 权限标识列表。 */
  permissions: string[];
  /** 角色标识列表。 */
  roles: string[];
  /** 路由树。 */
  routers: RouterVO[];
}
