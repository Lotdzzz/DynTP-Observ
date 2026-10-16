package com.dotm.config.security.handler;

import com.dotm.config.constants.TokenConstants;
import com.dotm.config.security.service.TokenFilterService;
import com.dotm.config.security.model.LoginBodyAuthentication;
import com.dotm.config.security.utils.IpUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author dotm
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    private final TokenFilterService tokenFilterService;

    /**
     * 如果没走到最后就放行说明需要登陆或者注册
     * 如果走到最后说明是已经登陆后的请求
     * 1 获取请求携带的jwt令牌
     * 2 验证令牌合法性
     * 3 获取用户指纹
     * 4 校验用户指纹
     * 5 用户信息放入本地上下文
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        //从请求头获取jwt令牌
        String authorization = request.getHeader(TokenConstants.HEADER_STRING);

        //获取登录ip
        String ip = IpUtils.getClientIp(request);

        //将ip设置进请求头中，方便后续获取
        request.setAttribute(TokenConstants.X_REAL_IP, ip);

        //如果没有令牌直接放行 由过滤链处理
        if (authorization == null) {
            filterChain.doFilter(request, response);
            return;
        }

        //处理令牌过滤
        LoginBodyAuthentication user = tokenFilterService.handleTokenFilter(authorization);

        //放入本地线程上下文
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
