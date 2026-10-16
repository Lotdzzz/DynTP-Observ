package com.dotm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.spring.service.impl.ServiceImpl;
import com.dotm.constants.UserConstants;
import com.dotm.entity.dto.system.SysMenuDTO;
import com.dotm.entity.model.system.SysMenu;
import com.dotm.entity.model.system.SysRoleMenu;
import com.dotm.entity.vo.SysMenuVO;
import com.dotm.mapper.SysMenuMapper;
import com.dotm.service.SysMenuService;
import com.dotm.service.SysRoleMenuService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author dotm
 * 针对表【sys_menu(菜单权限表)】的数据库操作Service实现
 * 创建时间：2026-08-06 17:04:42
 */
@Service
@RequiredArgsConstructor
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu>
        implements SysMenuService {

    private final SysRoleMenuService sysRoleMenuService;

    /**
     * 通过角色主键集合查询对应的menu集合
     */
    @Override
    public List<SysMenu> selectMenusByRoleIds(List<Long> roleIds) {
        LambdaQueryWrapper<SysRoleMenu> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.in(SysRoleMenu::getRoleId, roleIds);
        List<SysRoleMenu> sysRoleMenus = sysRoleMenuService.list(queryWrapper);
        if (sysRoleMenus != null && !sysRoleMenus.isEmpty()) {
            List<Long> menuIds = sysRoleMenus.stream().map(SysRoleMenu::getMenuId).toList();
            return listByIds(menuIds);
        }
        return List.of();
    }

    /**
     * 将menu集合组装成树状结构
     *
     * @param sysMenus menu集合
     * @return 结果
     */
    @Override
    public List<SysMenu> buildTree(List<SysMenu> sysMenus) {
        if (sysMenus == null || sysMenus.isEmpty()) {
            return List.of();
        }

        Comparator<SysMenu> menuOrder = Comparator
                .comparing(SysMenu::getOrderNum, Comparator.nullsLast(Comparator.naturalOrder()))
                .thenComparing(SysMenu::getMenuId);
        Map<Long, SysMenu> menusById = new HashMap<>();
        for (SysMenu menu : sysMenus) {
            if (menu.getMenuId() == null) {
                continue;
            }
            menu.setChildren(new ArrayList<>());
            menusById.put(menu.getMenuId(), menu);
        }

        List<SysMenu> roots = new ArrayList<>();
        for (SysMenu menu : menusById.values()) {
            Long parentId = menu.getParentId();
            SysMenu parent = parentId == null || parentId == 0L ? null : menusById.get(parentId);
            if (parent == null || parent.getMenuId().equals(menu.getMenuId())) {
                // 父节点没有权限、被停用或记录缺失时，提升为根节点，避免菜单丢失。
                roots.add(menu);
            } else {
                parent.getChildren().add(menu);
            }
        }
        sortTree(roots, menuOrder);
        return roots;
    }

    private void sortTree(List<SysMenu> menus, Comparator<SysMenu> menuOrder) {
        menus.sort(menuOrder);
        for (SysMenu menu : menus) {
            sortTree(menu.getChildren(), menuOrder);
        }
    }

    /**
     * 分页查询菜单
     */
    @Override
    public IPage<SysMenuVO> pageMenus(SysMenuDTO sysMenuDTO, long pageNum, long pageSize) {
        //创建分页对象
        Page<SysMenu> page = new Page<>(pageNum, pageSize);

        //条件构造器
        LambdaQueryWrapper<SysMenu> wrapper = buildMenuQuery(sysMenuDTO);

        //执行分页查询
        IPage<SysMenu> menuPage = page(page, wrapper);

        //转换为VO分页结果
        Page<SysMenuVO> voPage = new Page<>(pageNum, pageSize, menuPage.getTotal());
        voPage.setRecords(menuPage.getRecords().stream().map(this::toVO).toList());
        return voPage;
    }

    /**
     * Query all matching menus and convert them into an ordered tree.
     */
    @Override
    public List<SysMenuVO> listMenuTree(SysMenuDTO sysMenuDTO) {
        List<SysMenu> menus = list(buildMenuQuery(sysMenuDTO));
        return buildTree(menus).stream().map(this::toVO).toList();
    }

    /**
     * Create the shared menu query with a stable hierarchy order.
     */
    private LambdaQueryWrapper<SysMenu> buildMenuQuery(SysMenuDTO sysMenuDTO) {
        LambdaQueryWrapper<SysMenu> wrapper = new LambdaQueryWrapper<>();

        wrapper.like(
                StringUtils.isNotEmpty(sysMenuDTO.getMenuName()),
                SysMenu::getMenuName,
                sysMenuDTO.getMenuName()
        );

        wrapper.eq(
                StringUtils.isNotEmpty(sysMenuDTO.getMenuType()),
                SysMenu::getMenuType,
                sysMenuDTO.getMenuType()
        );

        wrapper.eq(
                StringUtils.isNotEmpty(sysMenuDTO.getVisible()),
                SysMenu::getVisible,
                sysMenuDTO.getVisible()
        );

        wrapper.eq(
                StringUtils.isNotEmpty(sysMenuDTO.getStatus()),
                SysMenu::getStatus,
                sysMenuDTO.getStatus()
        );

        return wrapper
                .orderByAsc(SysMenu::getParentId)
                .orderByAsc(SysMenu::getOrderNum)
                .orderByAsc(SysMenu::getMenuId);
    }

    /**
     * 根据菜单ID查询菜单
     */
    @Override
    public SysMenuVO getMenuById(Long menuId) {
        //根据ID查询菜单实体
        SysMenu sysMenu = getById(menuId);
        //转换为VO
        return toVO(sysMenu);
    }

    /**
     * 新增菜单
     */
    @Override
    public boolean addMenu(SysMenuDTO dto) {
        //DTO转换为菜单实体（忽略menuId，由数据库自增生成）
        SysMenu sysMenu = new SysMenu();
        BeanUtils.copyProperties(dto, sysMenu, UserConstants.MENU_ID);
        //保存菜单
        return save(sysMenu);
    }

    /**
     * 修改菜单
     */
    @Override
    public boolean updateMenu(SysMenuDTO dto) {
        //DTO转换为菜单实体
        SysMenu sysMenu = new SysMenu();
        BeanUtils.copyProperties(dto, sysMenu);
        //根据ID更新菜单
        return updateById(sysMenu);
    }

    /**
     * 菜单实体转换为视图对象
     *
     * @param sysMenu 菜单实体
     * @return 菜单视图对象
     */
    private SysMenuVO toVO(SysMenu sysMenu) {
        if (sysMenu == null) {
            return null;
        }
        SysMenuVO vo = new SysMenuVO();
        BeanUtils.copyProperties(sysMenu, vo, "children");
        vo.setChildren(sysMenu.getChildren().stream().map(this::toVO).toList());
        return vo;
    }
}


