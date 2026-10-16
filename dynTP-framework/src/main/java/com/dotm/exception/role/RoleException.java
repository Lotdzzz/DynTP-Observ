package com.dotm.exception.role;

/**
 * @author dotm
 * 角色异常
 */
public class RoleException extends RuntimeException {

    public RoleException(String message) {
        this(message, null);
    }

    public RoleException(String message, Throwable cause) {
        super(message, cause);
    }
}
