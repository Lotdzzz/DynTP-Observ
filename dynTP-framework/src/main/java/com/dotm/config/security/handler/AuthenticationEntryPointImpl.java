package com.dotm.config.security.handler;

import com.dotm.config.constants.TokenConstants;
import com.dotm.constants.HttpStatus;
import com.dotm.exception.constants.ExceptionConstants;
import com.dotm.model.Result;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author dotm
 */
@Slf4j
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    @Override
    public void commence(@NonNull HttpServletRequest request,
                         @NonNull HttpServletResponse response,
                         @NonNull AuthenticationException authException) throws IOException {
        log.error("AuthenticationEntryPointImpl commence error: {}", authException.getMessage());

        // 设置响应头
        response.setStatus(HttpStatus.SUCCESS);
        response.setContentType(TokenConstants.APPLICATION_JSON_CHARSET_UTF_8);
        response.getWriter().print(new ObjectMapper().writeValueAsString(
                Result.error(HttpStatus.UNAUTHORIZED, ExceptionConstants.UNAUTHORIZED)
        ));
    }

}
