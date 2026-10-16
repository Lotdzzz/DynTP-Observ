package com.dotm.config.web.service;

import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * UserDetailsService的抽象接口 额外封装一次对实现类做扩展以后的oauth的provider处理
 *
 * @author dotm
 */
public interface IUserDetailsService extends UserDetailsService {
}
