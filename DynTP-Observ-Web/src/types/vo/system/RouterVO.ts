import type { MetaVO } from './MetaVO';

/** 路由信息视图对象。 */
export interface RouterVO {
  /** 路由名称。 */
  name: string;
  /** 路由路径。 */
  path: string;
  /** 是否隐藏。 */
  hidden: boolean;
  /** 重定向地址。 */
  redirect: string;
  /** 路由组件。 */
  component: string;
  /** 菜单类型（M 目录，C 菜单，F 按钮）。 */
  menuType: string;
  /** 路由参数。 */
  query: string;
  /** 是否始终显示根菜单。 */
  alwaysShow: boolean;
  /** 路由元信息。 */
  meta: MetaVO;
  /** 子路由列表。 */
  children: RouterVO[];
}
