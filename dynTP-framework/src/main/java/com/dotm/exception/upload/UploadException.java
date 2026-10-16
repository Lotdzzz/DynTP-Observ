package com.dotm.exception.upload;

/**
 * @author dotm
 * 文件上传异常
 */
public class UploadException extends RuntimeException {

    public UploadException(String message) {
        this(message, null);
    }

    public UploadException(String message, Throwable cause) {
        super(message, cause);
    }
}
