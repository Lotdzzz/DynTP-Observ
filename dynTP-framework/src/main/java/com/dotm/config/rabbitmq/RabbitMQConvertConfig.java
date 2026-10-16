package com.dotm.config.rabbitmq;

import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author dotm
 * RabbitMQConvertConfig 配置类
 * 用于配置 RabbitMQ 消息转换器
 */
@Configuration
public class RabbitMQConvertConfig {

    /**
     * 消息转换器
     */
    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }
}
