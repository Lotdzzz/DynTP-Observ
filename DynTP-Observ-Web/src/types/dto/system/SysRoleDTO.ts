/** 角色新增或修改请求参数。 */
export interface SysRoleDTO {
  /** 角色 ID，修改时必填。 */
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
  /** 备注。 */
  remark: string;
  /** 菜单权限列表。 */
  menuIds: number[];
}
