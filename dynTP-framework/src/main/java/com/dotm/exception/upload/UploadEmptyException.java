package com.dotm.exception.upload;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 文件上传为空异常
 */
@Slf4j
public class UploadEmptyException extends UploadException {

    public UploadEmptyException(String message) {
        this(message, null);
    }

    public UploadEmptyException(String message, Throwable cause) {
        super(ExceptionConstants.FILE_NULL, cause);
        log.info("{}: {}", ExceptionConstants.FILE_NULL, message, cause);
    }
}
