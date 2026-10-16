package com.dotm.exception.upload;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 文件名不合法异常
 */
@Slf4j
public class UploadNameException extends UploadException {

    public UploadNameException(String message) {
        this(message, null);
    }

    public UploadNameException(String message, Throwable cause) {
        super(ExceptionConstants.FILE_NAME_INVALID, cause);
        log.info("{}: {}", ExceptionConstants.FILE_NAME_INVALID, message, cause);
    }
}
