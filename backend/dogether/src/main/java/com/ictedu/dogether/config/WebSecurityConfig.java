package com.ictedu.dogether.config;

import lombok.RequiredArgsConstructor;
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
                .sessionManagement(); // 세션인증 사용 안하겠다는 것임.
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
                // 여기서부터 어떤 요청을 인증 안 할 것인지, 언제 인증을 할 것인지 설정 -> 정해져 있음
//                .authorizeRequests()
                // /api/auth/** 은 permit이지만, /promote는 검증이 필요하기 때문에 추가.(순서 조심)
//                .antMatchers(HttpMethod.POST, "/user/join").permitAll()

                // antMatchers(): '/api/auth'로 시작하는 요청과 '/'요청은 권한 검사 없이 허용하겠다. 라는 뜻임
               // permitAll(): 모두 인증시키겠다.
                // '/api/todos'라는 요청이 POST로 들어오고, Role 값이 ADMIN인 경우 권한 검사 없이 허용하겠다.
                // .antMatchers(HttpMethod.POST, "/api/todos").hasRole("ADMIN")
//                .anyRequest().authenticated(); // 나머지 모두는 인증이 되어야 한다,
        return http.build();
    }


}
