package com.dotm.exception.user;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 用户锁定异常
 */
@Slf4j
public class UserLockedException extends UserException {

    public UserLockedException(String message) {
        this(message, null);
    }

    public UserLockedException(String message, Throwable cause) {
        super(ExceptionConstants.USER_LOCKED, cause);
        log.info("{}: {}", ExceptionConstants.USER_LOCKED, message, cause);
    }
}
