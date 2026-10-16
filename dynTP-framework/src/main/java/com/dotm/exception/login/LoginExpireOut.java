package com.dotm.exception.login;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * 请求过期
 *
 * @author dotm
 */
@Slf4j
public class LoginExpireOut extends LoginException {

    public LoginExpireOut(String message) {
        this(message, null);
    }

    public LoginExpireOut(String message, Throwable cause) {
        super(ExceptionConstants.LOGIN_EXPIRE_OUT, cause);
        log.info("{}: {}", ExceptionConstants.LOGIN_EXPIRE_OUT, message, cause);
    }

}
