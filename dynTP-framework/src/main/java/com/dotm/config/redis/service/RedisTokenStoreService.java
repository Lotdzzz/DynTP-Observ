package com.dotm.config.redis.service;

import com.dotm.config.web.service.CacheStore;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

/**
 * @author dotm
 * Redis 缓存服务实现类。
 *
 * <p>功能与 `RedisCache` 工具类保持一致，供业务层通过依赖注入直接使用。</p>
 */
@SuppressWarnings(value = {"unchecked", "rawtypes"})
@Component
public class RedisTokenStoreService implements CacheStore {

    /**
     * Spring 注入的 Redis 操作模板。
     */
    @Resource(name = "redisTemplateCache")
    private RedisTemplate redisTemplate;

    /**
     * 缓存基本的对象，Integer、String、实体类等。
     *
     * @param key   缓存的键值
     * @param value 缓存的值
     * @param <T>   缓存值类型
     */
    @Override
    public <T> void setCacheObject(final String key, final T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 缓存基本的对象，Integer、String、实体类等。
     *
     * @param key      缓存的键值
     * @param value    缓存的值
     * @param timeout  时间
     * @param timeUnit 时间颗粒度
     * @param <T>      缓存值类型
     */
    @Override
    public <T> void setCacheObject(final String key, final T value, final Integer timeout, final TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 设置有效时间。
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @return true=设置成功；false=设置失败
     */
    @Override
    public boolean expire(final String key, final long timeout) {
        return expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 设置有效时间。
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @param unit    时间单位
     * @return true=设置成功；false=设置失败
     */
    @Override
    public boolean expire(final String key, final long timeout, final TimeUnit unit) {
        return redisTemplate.expire(key, timeout, unit);
    }

    /**
     * 获取有效时间。
     *
     * @param key Redis键
     * @return 有效时间
     */
    @Override
    public long getExpire(final String key) {
        return redisTemplate.getExpire(key);
    }

    /**
     * 判断 key 是否存在。
     *
     * @param key 键
     * @return true 存在 false 不存在
     */
    @Override
    public Boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 获得缓存的基本对象。
     *
     * @param key 缓存键值
     * @param <T> 缓存值类型
     * @return 缓存键值对应的数据
     */
    @Override
    public <T> T getCacheObject(final String key) {
        ValueOperations<String, T> operation = redisTemplate.opsForValue();
        return operation.get(key);
    }

    /**
     * 删除单个对象。
     *
     * @param key 键
     * @return 是否删除成功
     */
    @Override
    public boolean deleteObject(final String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 获得匹配指定模式的 Redis Key 集合。
     *
     * @param pattern 字符串前缀
     * @return Key 集合
     */
    @Override
    public Collection<String> keys(final String pattern) {
        return redisTemplate.keys(pattern);
    }
}
