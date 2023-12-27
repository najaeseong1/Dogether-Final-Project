package com.ictedu.dogether.userapi.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ictedu.dogether.userapi.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Setter
@Getter
@ToString
public class KakaoUserDTO {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;


    @Setter
    @Getter
    @ToString
    public static class KakaoAccount {

        private String email;

    }

    public User toEntity(String accessToken) {
        log.info("\n\n\n\n 투 엔터티 에서 카카오 이메일 : ", this.kakaoAccount.email);
        return User.builder()
                .userId(this.kakaoAccount.email)
                .userName("kakaoName")
                .userPass("kakaoPass")
                .userPhone("kakaoPhone")
                .userEmail(this.kakaoAccount.email)
                .postNo(11111)
                .postAddr("kakaoPost")
                .accessToken(accessToken)
                .build();
    }

}
