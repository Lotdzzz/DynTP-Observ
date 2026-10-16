package com.dotm.service.impl;

import com.dotm.config.properties.upload.MinioProperties;
import com.dotm.exception.upload.UploadPutException;
import com.dotm.service.MinioService;
import io.minio.MinioClient;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * MinioService类用于处理与MinIO服务相关的业务逻辑
 *
 * @author dotm
 */
@Service
@RequiredArgsConstructor
public class MinioServiceImpl implements MinioService {

    private final MinioClient minioClient;

    private final MinioProperties minioProperties;

    /**
     * 上传图片文件到MinIO
     *
     * @param newFileName 新文件名
     * @param file        上传的图片文件
     * @return 图片在MinIO中的访问URL
     */
    @Override
    public String uploadImage(String newFileName, MultipartFile file) throws IOException {
        try {
            minioClient.putObject(
                    io.minio.PutObjectArgs.builder()
                            .bucket(minioProperties.getAvatarUploadBucketName())
                            .object(newFileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
        } catch (ErrorResponseException | InsufficientDataException | InternalException | InvalidKeyException |
                 InvalidResponseException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
            throw new UploadPutException(e.getMessage());
        }
        return minioProperties.getEndpoint()
                + "/" + minioProperties.getAvatarUploadBucketName()
                + "/" + newFileName;
    }
}
