package com.dotm.exception.upload;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 上传异常类
 */
@Slf4j
public class UploadPutException extends UploadException {

    public UploadPutException(String message) {
        this(message, null);
    }

    public UploadPutException(String message, Throwable cause) {
        super(ExceptionConstants.UPLOAD_PUT_ERROR, cause);
        log.info("{}: {}", ExceptionConstants.UPLOAD_PUT_ERROR, message, cause);
    }
}
