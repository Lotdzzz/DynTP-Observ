package com.dotm.exception.user;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 用户密码不正确或不符合规范异常类
 */
@Slf4j
public class UserPasswordNotMatchException extends UserException {

    public UserPasswordNotMatchException(String message) {
        this(message, null);
    }

    public UserPasswordNotMatchException(String message, Throwable cause) {
        super(ExceptionConstants.USERNAME_PASSWORD_NOT_MATCH, cause);
        log.info("{}: {}", ExceptionConstants.USERNAME_PASSWORD_NOT_MATCH, message, cause);
    }
}
