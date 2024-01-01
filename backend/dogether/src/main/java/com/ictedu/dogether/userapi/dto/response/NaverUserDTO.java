package com.ictedu.dogether.userapi.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ictedu.dogether.userapi.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Setter @Getter
@ToString
@Slf4j
public class NaverUserDTO {

    @JsonProperty("naver_account")
    private NaverUserDTO.NaverAccount naverAccount;


    @Setter
    @Getter
    @ToString
    public static class NaverAccount {

        private String name;
        private String email;
        private String phone;

    }

    public User toEntity(String accessToken) {
        String email = this.naverAccount.email;
        // '@' 기호의 위치를 찾습니다.
        int atIndex = email.indexOf('@');

        // '@' 기호가 있다면, '@' 이전의 부분을 userId로 사용합니다.
        // '@' 기호가 없다면, 이메일 전체를 userId로 사용합니다.
        String userId = atIndex != -1 ? email.substring(0, atIndex) : email;

        return User.builder()
                .userId(userId)
                .userName(this.naverAccount.name)
                .userPass("NaverPass")
                .userPhone(this.naverAccount.phone)
                .userEmail(email)
                .postNo(11111)
                .postAddr("kakaoPost")
                .accessToken(accessToken)
                .build();
    }


}
