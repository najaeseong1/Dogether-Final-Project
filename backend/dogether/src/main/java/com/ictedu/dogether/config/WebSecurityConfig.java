package com.ictedu.dogether.config;

import com.ictedu.dogether.filter.JwtAuthFilter;
import com.ictedu.dogether.filter.JwtExceptionFilter;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.Realm;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    private final  JwtAuthFilter jwtAuthFilter;
    private final  JwtExceptionFilter jwtExceptionFilter;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 시큐리티 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Security 모듈이 기본적으로 제공하는 보안 정책 해제.
        http
                .cors()
                .and()
                .csrf().disable()
                .httpBasic().disable()
                .sessionManagement() // 세션인증 사용 안하겠다는 것임.
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .antMatchers(HttpMethod.GET, "/contract/adminPage").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/board/regist").hasRole("COMMON")
                .antMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/adminRejected").hasRole("ADMIN")
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated();


        http.addFilterAfter(
                jwtAuthFilter,
                CorsFilter.class // import 주의: 스프링 꺼로
        );


        http.addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class);
        return http.build();
    }




}
