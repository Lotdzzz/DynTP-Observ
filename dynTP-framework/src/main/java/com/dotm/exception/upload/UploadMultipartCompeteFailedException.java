package com.dotm.exception.upload;

import com.dotm.exception.constants.ExceptionConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * 上传分片完成失败异常
 *
 * @author dotm
 */
@Slf4j
public class UploadMultipartCompeteFailedException extends UploadException {

    public UploadMultipartCompeteFailedException(String message) {
        this(message, null);
    }

    public UploadMultipartCompeteFailedException(String message, Throwable cause) {
        super(ExceptionConstants.FILE_PART_COMPLETE_FAILED, cause);
        log.info("{}: {}", ExceptionConstants.FILE_PART_COMPLETE_FAILED, message, cause);
    }

}
