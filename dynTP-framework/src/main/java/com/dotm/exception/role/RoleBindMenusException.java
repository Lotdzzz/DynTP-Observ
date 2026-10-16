package com.dotm.exception.role;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * @description 角色绑定菜单异常
 * @date 2026-08-06 17:04:42
 */
@Slf4j
public class RoleBindMenusException extends RoleException {

    public RoleBindMenusException(String message) {
        this(message, null);
    }

    public RoleBindMenusException(String message, Throwable cause) {
        super(ExceptionConstants.ROLE_BIND_MENUS, cause);
        log.info("{}: {}", ExceptionConstants.ROLE_BIND_MENUS, message, cause);
    }
}
