package com.ictedu.dogether.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화 (테스트를 위해)
                .authorizeRequests()
                .antMatchers("/board/regist").permitAll() // 특정 URL은 모든 사용자에게 허용
                .anyRequest().permitAll() // 나머지 요청은 모두 허용
                .and()
                .formLogin().disable() // 로그인 기능 비활성화
                .httpBasic().disable(); // HTTP 기본 인증 비활성화
    }
}
