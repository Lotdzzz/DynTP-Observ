package com.dotm.exception.token;

/**
 * 令牌异常
 *
 * @author dotm
 */
public class TokenException extends RuntimeException {

    public TokenException(String message) {
        this(message, null);
    }

    public TokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
