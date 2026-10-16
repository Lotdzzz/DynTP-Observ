package com.dotm.exception.token;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * 令牌无效异常
 *
 * @author dotm
 */
@Slf4j
public class TokenInvalidException extends TokenException {

    public TokenInvalidException(String message) {
        this(message, null);
    }

    public TokenInvalidException(String message, Throwable cause) {
        super(ExceptionConstants.TOKEN_INVALID, cause);
        log.info("{}: {}", ExceptionConstants.TOKEN_INVALID, message, cause);
    }
}
