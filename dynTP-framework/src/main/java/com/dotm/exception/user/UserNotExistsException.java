package com.dotm.exception.user;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 用户不存在异常类
 */
@Slf4j
public class UserNotExistsException extends UserException {

    public UserNotExistsException(String message) {
        this(message, null);
    }

    public UserNotExistsException(String message, Throwable cause) {
        super(ExceptionConstants.USER_NOT_EXISTS, cause);
        log.info("{}: {}", ExceptionConstants.USER_NOT_EXISTS, message, cause);
    }
}
