package com.dotm.exception.user;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * 用户账号过期异常
 */
@Slf4j
public class UserAccountExpired extends UserException {

    public UserAccountExpired(String message) {
        this(message, null);
    }

    public UserAccountExpired(String message, Throwable cause) {
        super(ExceptionConstants.USER_ACCOUNT_EXPIRED, cause);
        log.info("{}: {}", ExceptionConstants.USER_ACCOUNT_EXPIRED, message, cause);
    }

}
