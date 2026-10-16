package com.dotm.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * MinioService类用于处理与MinIO服务相关的业务逻辑
 *
 * @author dotm
 */
public interface MinioService {


    /**
     * 上传图片文件到MinIO
     *
     * @param newFileName 新文件名
     * @param file        上传的图片文件
     * @return 图片在MinIO中的访问URL
     */
    String uploadImage(String newFileName, MultipartFile file) throws IOException;
}
