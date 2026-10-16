package com.dotm.exception.login;

/**
 * 登录异常
 *
 * @author dotm
 */
public class LoginException extends RuntimeException {

    public LoginException(String message) {
        this(message, null);
    }

    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }

}
