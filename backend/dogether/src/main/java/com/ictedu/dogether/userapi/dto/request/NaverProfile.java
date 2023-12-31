package com.ictedu.dogether.userapi.dto.request;

import lombok.Data;

@Data
public class NaverProfile {

    private String resultcode;
    private String message;
    private response response; // Json 형태로 주어지는 정보들을 담아줄 객체필드 생성 필수

    // Json 형태로 담길 데이터를 받을 클래스(실질적인 정보들이다)
    @Data
    public class response {
        private String id;
        private String name;
        private String email;
        private String mobile;
        private String mobile_e164;
    }

}
