/** 菜单新增或修改请求参数。 */
export interface SysMenuDTO {
  /** 菜单 ID，修改时必填。 */
  menuId: number;
  /** 菜单名称。 */
  menuName: string;
  /** 父菜单 ID。 */
  parentId: number;
  /** 显示顺序。 */
  orderNum: number;
  /** 路由地址。 */
  path: string;
  /** 组件路径。 */
  component: string;
  /** 路由参数。 */
  query: string;
  /** 路由名称。 */
  routeName: string;
  /** 是否为外链（0 是，1 否）。 */
  isFrame: number;
  /** 是否缓存（0 缓存，1 不缓存）。 */
  isCache: number;
  /** 菜单类型（M 目录，C 菜单，F 按钮）。 */
  menuType: string;
  /** 菜单状态（0 显示，1 隐藏）。 */
  visible: string;
  /** 菜单状态（0 正常，1 停用）。 */
  status: string;
  /** 权限标识。 */
  perms: string;
  /** 菜单图标。 */
  icon: string;
  /** 备注。 */
  remark: string;
}
