package com.dotm.config.security.service;

import com.dotm.config.constants.Constants;
import com.dotm.config.constants.TokenConstants;
import com.dotm.config.security.model.LoginBodyAuthentication;
import com.dotm.config.security.properties.JwtProperties;
import com.dotm.config.web.service.CacheStore;
import com.dotm.config.web.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * @author dotm
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final JwtProperties jwtProperties;

    private final CacheStore cacheStore;

    /**
     * 密钥转码加密
     */
    public static SecretKey getSecretKey(String secretKey) {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * jwt 生成过程，用于用户登录成功后。
     * 根据uuid+username+userAgent设置token
     * 在根据uuid为key sysUser为value为value存入redis设置过期时间
     */
    @Override
    public String createJwtToken(LoginBodyAuthentication sysUser) {
        //生成uuid
        UUID uuid = UUID.randomUUID();
        sysUser.setUuid(uuid.toString());

        //拼装claims
        HashMap<String, Object> claims = new HashMap<>();
        claims.put(Constants.USERNAME, sysUser.getUsername()); //用户名
        claims.put(TokenConstants.USER_AGENT, sysUser.getUserAgent()); //设备指纹
        claims.put(TokenConstants.UUID, sysUser.getUuid()); //uuid

        //存入redis刷新过期时间
        saveToken(sysUser, jwtProperties.getTtl());

        return Jwts.builder()
                .claims(claims)
                .signWith(getSecretKey(jwtProperties.getSecretKey()))
                .compact();
    }

    /**
     * 存入缓存
     */
    @Override
    public void saveToken(LoginBodyAuthentication user, Integer ttl) {
        cacheStore.setCacheObject(user.getUuid(), user, ttl, TimeUnit.MINUTES);
    }

    /**
     * 删除redis
     */
    @Override
    public void deleteToken(String uuid) {
        cacheStore.deleteObject(uuid);
    }

    /**
     * 验证 token 令牌。
     *
     * @param token jwt 本体
     * @return 结果
     */
    @Override
    @SuppressWarnings("all")
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSecretKey(jwtProperties.getSecretKey()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return true;
        } catch (UnsupportedJwtException e) {
            log.error("不支持的JWT令牌格式：{}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("JWT令牌格式错误：{}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT令牌参数为空：{}", e.getMessage());
        }
        return false;
    }

    /**
     * 解析 Token 所有载荷（不验证签名和过期时间）。
     *
     * @param secret JWT 密钥
     * @param token  jwt 本体
     * @return Token 载荷内容
     */
    @Override
    public Claims getClaimsFromToken(String secret, String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey(secret))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * 从请求头中提取 Token（去除前缀）。
     *
     * @param header 请求头中的 token 值
     * @param prefix token 前缀
     * @return 去除前缀后的 token；如果格式不匹配则返回 null
     */
    @Override
    public String extractTokenFromHeader(String header, String prefix) {
        if (header == null || !header.startsWith(prefix + " ")) {
            return null;
        }
        return header.substring(prefix.length() + 1);
    }

    /**
     * 指纹校验与令牌刷新
     *
     * @param jwt 令牌
     */
    @Override
    public LoginBodyAuthentication detailsValidateRefreshToken(String jwt) {
        //获取UUID
        Claims claims = getClaimsFromToken(jwtProperties.getSecretKey(), jwt);

        //拿到用户唯一标识UUID
        String uuid = (String) claims.get(TokenConstants.UUID);

        //从redis获取用户指纹
        LoginBodyAuthentication sysUser = cacheStore.getCacheObject(uuid);

        if (sysUser == null) {
            return null;
        }

        //设置uuid
        sysUser.setUuid(uuid);

        //刷新过期时间
        refreshToken(sysUser, jwtProperties.getTtl());
        return sysUser;
    }

    /**
     * 刷新令牌过期时间
     */
    @Override
    public void refreshToken(LoginBodyAuthentication sysUser, Integer ttl) {
        // 剩余过期时间（秒），key 不存在返回 -2，无过期返回 -1
        long remaining = cacheStore.getExpire(sysUser.getUuid());

        // 只有剩余时间低于总 TTL 的三分之一时才续期，避免每个请求都写 Redis
        long thresholdSeconds = ttl.longValue() * 60L / 3;
        if (remaining < thresholdSeconds) {
            cacheStore.setCacheObject(sysUser.getUuid(), sysUser, ttl, TimeUnit.MINUTES);
        }
    }

    /**
     * 判断token是否存在
     */
    @Override
    public boolean checkTokenExists(String token) {
        //获取UUID
        Claims claims = getClaimsFromToken(jwtProperties.getSecretKey(), token);

        if (claims == null) {
            return false;
        }
        // 拿到用户唯一标识UUID
        String uuid = (String) claims.get(TokenConstants.UUID);

        // 从redis获取用户指纹
        LoginBodyAuthentication sysUser = cacheStore.getCacheObject(uuid);
        return sysUser != null;
    }
}
