package com.dotm.config.rabbitmq;

import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.ConditionalRejectingErrorHandler;
import org.springframework.boot.amqp.autoconfigure.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author dotm
 * RabbitMQListenerConfig 配置类
 */
@Configuration
public class RabbitMQListenerConfig {

    // 注入 Spring Boot 自动配置好的容器工厂属性
    @Bean
    @SuppressWarnings("all")
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            SimpleRabbitListenerContainerFactoryConfigurer configurer,
            ConnectionFactory connectionFactory) {

        // 1. 让 Spring Boot 用 YAML 配置帮生成一个基础工厂
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        configurer.configure(factory, connectionFactory);

        // 3. 设置致命异常策略（无法用 YAML 表达）
        factory.setErrorHandler(new ConditionalRejectingErrorHandler(
                t -> t instanceof IllegalArgumentException  // 参数错误直接丢弃，不重试
        ));

        return factory;
    }
}
