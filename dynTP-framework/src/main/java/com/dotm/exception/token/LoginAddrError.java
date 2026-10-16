package com.dotm.exception.token;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * 登录设备或地点异常
 *
 * @author dotm
 */
@Slf4j
public class LoginAddrError extends TokenException {

    public LoginAddrError(String message) {
        this(message, null);
    }

    public LoginAddrError(String message, Throwable cause) {
        super(ExceptionConstants.LOGIN_ADDR_ERROR, cause);
        log.info("{}: {}", ExceptionConstants.LOGIN_ADDR_ERROR, message, cause);
    }
}
