package com.dotm.config.security.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.server.ServerWebExchange;

import java.util.Objects;

/**
 * @author dotm
 * 获取ip地址工具类
 */
public class IpUtils {

    private IpUtils() {
    }

    private static final String UNKNOWN = "unknown";
    private static final String LOCALHOST_IPV4 = "127.0.0.1";
    private static final String LOCALHOST_IPV6 = "0:0:0:0:0:0:0:1";

    /**
     * 默认安全模式：只获取直接连接的客户端 IP。
     */
    public static String getClientIp(HttpServletRequest request) {
        return getClientIp(request, false);
    }

    /**
     * @param request      HTTP 请求
     * @param trustedProxy 是否确认请求来自可信反向代理
     */
    public static String getClientIp(HttpServletRequest request, boolean trustedProxy) {
        if (request == null) {
            return UNKNOWN;
        }

        if (trustedProxy) {
            // 仅在可信代理已正确清理请求头时使用
            String ip = request.getHeader("X-Forwarded-For");

            if (hasText(ip)) {
                // 取代理链中的第一个 IP
                String firstIp = ip.split(",", 2)[0].trim();
                if (hasText(firstIp)) {
                    return firstIp;
                }
            }

            ip = request.getHeader("X-Real-IP");
            if (hasText(ip)) {
                return ip.trim();
            }
        }

        String remoteAddr = request.getRemoteAddr();
        return hasText(remoteAddr) ?
                (LOCALHOST_IPV6.equals(remoteAddr) ? remoteAddr = LOCALHOST_IPV4 : remoteAddr)
                : UNKNOWN;
    }

    private static boolean hasText(String value) {
        return value != null
                && !value.isBlank()
                && !UNKNOWN.equalsIgnoreCase(value.trim());
    }

    /**
     * 网关模块获取客户端IP地址
     *
     * @param exchange 请求头
     * @return ip
     */
    public static String getClientIp(ServerWebExchange exchange) {
        if (exchange == null) {
            return UNKNOWN;
        }

        //获取用户公网ip
        String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();

        if (LOCALHOST_IPV6.equals(ip)) {
            ip = LOCALHOST_IPV4;
        }
        return ip;
    }
}
