package com.dotm.config.minio;

import com.dotm.config.properties.upload.MinioProperties;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * MinIO配置类
 *
 * @author dotm
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class MinioConfig {

    private final MinioProperties minioProperties;

    /**
     * 配置MinioClient Bean，用于与MinIO服务进行交互
     */
    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(minioProperties.getEndpoint())
                .credentials(minioProperties.getAccessKey(), minioProperties.getSecretKey())
                .build();
    }
}
