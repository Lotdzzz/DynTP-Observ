package com.dotm.exception.user;

/**
 * @author dotm
 * 用户信息异常类
 */
public class UserException extends RuntimeException {

    public UserException(String message) {
        this(message, null);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }
}
