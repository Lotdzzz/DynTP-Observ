/** 角色信息视图对象。 */
export interface SysRoleVO {
  /** 角色 ID。 */
  roleId: number;
  /** 角色名称。 */
  roleName: string;
  /** 角色权限字符串。 */
  roleKey: string;
  /** 显示顺序。 */
  roleSort: number;
  /** 数据范围。 */
  dataScope: string;
  /** 菜单树选择项是否关联显示。 */
  menuCheckStrictly: number;
  /** 部门树选择项是否关联显示。 */
  deptCheckStrictly: number;
  /** 角色状态（0 正常，1 停用）。 */
  status: string;
  /** 创建时间。 */
  createTime: string;
  /** 更新时间。 */
  updateTime: string;
  /** 备注。 */
  remark: string;
  /** 菜单权限列表。 */
  menuIds: number[];
}
