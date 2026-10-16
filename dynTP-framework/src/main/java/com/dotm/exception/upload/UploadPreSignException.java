package com.dotm.exception.upload;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dotm
 * 文件上传预签名异常
 */
@Slf4j
public class UploadPreSignException extends UploadException {

    public UploadPreSignException(String message) {
        this(message, null);
    }

    public UploadPreSignException(String message, Throwable cause) {
        super(ExceptionConstants.FILE_PRE_SIGN_ERROR, cause);
        log.info("{}: {}", ExceptionConstants.FILE_PRE_SIGN_ERROR, message, cause);
    }

}
