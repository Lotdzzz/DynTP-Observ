package com.dotm.config.web.service;

import com.dotm.config.security.model.LoginBodyAuthentication;
import io.jsonwebtoken.Claims;

/**
 * JWT 令牌服务接口
 *
 * @author dotm
 */
public interface TokenService {

    /**
     * 创建 JWT 令牌。
     */
    String createJwtToken(LoginBodyAuthentication sysUser);

    /**
     * 存入redis
     */
    void saveToken(LoginBodyAuthentication loginBodyModel, Integer ttl);

    /**
     * 删除redis中的token
     */
    void deleteToken(String uuid);

    /**
     * 验证 token 令牌。
     *
     * @param token jwt 本体
     * @return 结果
     */
    boolean validateToken(String token);

    /**
     * 解析 Token 所有载荷（不验证签名和过期时间）。
     *
     * @param secret JWT 密钥
     * @param token  jwt 本体
     * @return Token 载荷内容
     */
    Claims getClaimsFromToken(String secret, String token);

    /**
     * 从请求头中提取 Token（去除前缀）。
     *
     * @param header 请求头中的 token 值
     * @param prefix token 前缀
     * @return 去除前缀后的 token；如果格式不匹配则返回 null
     */
    String extractTokenFromHeader(String header, String prefix);

    /**
     * 指纹校验与令牌刷新
     *
     * @param jwt 令牌
     */
    LoginBodyAuthentication detailsValidateRefreshToken(String jwt);

    /**
     * 刷新令牌过期时间
     *
     * @param sysUser 用户信息
     * @param ttl     过期时间
     */
    void refreshToken(LoginBodyAuthentication sysUser, Integer ttl);

    /**
     * 判断token是否存在
     */
    boolean checkTokenExists(String token);
}

