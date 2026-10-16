package com.dotm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * the project main starter entry
 *
 * @author dotm
 */
@SpringBootApplication
@MapperScan("com.dotm.**.mapper")
public class DynTPObservabilityStarterApplication {
    public static void main(String[] args) {
        SpringApplication.run(DynTPObservabilityStarterApplication.class, args);
    }
}
