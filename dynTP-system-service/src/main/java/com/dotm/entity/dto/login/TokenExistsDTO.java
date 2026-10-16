package com.dotm.entity.dto.login;

import lombok.Data;

/**
 * 判断token是否存在的DTO
 *
 * @author dotm
 */
@Data
public class TokenExistsDTO {

    /**
     * token
     */
    private String token;
}
