package com.dotm.config.web.service;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

/**
 * 缓存接口服务
 * 横向模块之间解耦合
 * 调用者不必关心缓存的具体实现方式
 *
 * @author dotm
 */
public interface CacheStore {
    /**
     * 缓存基本的对象，Integer、String、实体类等。
     *
     * @param key   缓存的键值
     * @param value 缓存的值
     */
    <T> void setCacheObject(String key, T value);

    /**
     * 缓存基本的对象，Integer、String、实体类等。
     *
     * @param key      缓存的键值
     * @param value    缓存的值
     * @param timeout  时间
     * @param timeUnit 时间颗粒度
     */
    <T> void setCacheObject(String key, T value, Integer timeout, TimeUnit timeUnit);

    /**
     * 设置有效时间。
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @return true=设置成功；false=设置失败
     */
    boolean expire(String key, long timeout);

    /**
     * 设置有效时间。
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @param unit    时间单位
     * @return true=设置成功；false=设置失败
     */
    boolean expire(String key, long timeout, TimeUnit unit);

    /**
     * 获取有效时间。
     *
     * @param key Redis键
     * @return 有效时间
     */
    long getExpire(String key);

    /**
     * 判断 key 是否存在。
     *
     * @param key 键
     * @return true 存在 false 不存在
     */
    Boolean hasKey(String key);

    /**
     * 获得缓存的基本对象。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    <T> T getCacheObject(String key);

    /**
     * 删除单个对象。
     *
     * @param key 键
     * @return 是否删除成功
     */
    boolean deleteObject(String key);

    /**
     * 获得匹配指定模式的 Redis Key 集合。
     *
     * @param pattern 字符串前缀
     * @return Key 集合
     */
    Collection<String> keys(String pattern);
}
