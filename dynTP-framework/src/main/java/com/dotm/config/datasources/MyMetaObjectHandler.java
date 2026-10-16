package com.dotm.config.datasources;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.dotm.config.constants.MybatisPlusConstants;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author dotm
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        // 严格填充 - 只有字段值为 null 时才填充
        this.strictInsertFill(metaObject, MybatisPlusConstants.CREATE_TIME, LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, MybatisPlusConstants.UPDATE_TIME, LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        // 更新时只填充 updateTime
        this.strictUpdateFill(metaObject, MybatisPlusConstants.UPDATE_TIME, LocalDateTime.class, LocalDateTime.now());
    }
}
