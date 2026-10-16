package com.dotm.config.security.service;

import com.dotm.config.constants.TokenConstants;
import com.dotm.config.security.model.LoginBodyAuthentication;
import com.dotm.config.web.service.TokenService;
import com.dotm.exception.constants.ExceptionConstants;
import com.dotm.exception.token.LoginAddrError;
import com.dotm.exception.token.TokenInvalidException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Token过滤器服务类
 *
 * @author dotm
 */
@Component
@RequiredArgsConstructor
public class TokenFilterService {

    private final TokenService tokenService;

    /**
     * 处理Token过滤逻辑
     */
    public LoginBodyAuthentication handleTokenFilter(String authorization) {
        //如果令牌存在且以Bearer开头则开始令牌验证与取信息
        if (!authorization.startsWith(TokenConstants.TOKEN_PREFIX + " ")) {
            throw new TokenInvalidException(ExceptionConstants.TOKEN_INVALID);
        }

        //剔除jwt前缀
        String jwt = tokenService.extractTokenFromHeader(authorization, TokenConstants.TOKEN_PREFIX);

        //开始对jwt进行防伪验证
        if (!tokenService.validateToken(jwt)) {
            throw new TokenInvalidException(ExceptionConstants.TOKEN_INVALID);
        }

        //指纹校验与令牌刷新
        LoginBodyAuthentication userDetails = tokenService.detailsValidateRefreshToken(jwt);

        if (userDetails == null) {
            throw new TokenInvalidException(ExceptionConstants.TOKEN_INVALID);
        }

        //设备指纹校验
        if (!Objects.equals(userDetails.userAgent, userDetails.getUserAgent())) {
            throw new LoginAddrError(ExceptionConstants.LOGIN_ADDR_ERROR);
        }

        return userDetails;
    }
}
