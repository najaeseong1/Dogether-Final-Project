package com.ictedu.dogether.userapi.dto.response;

import lombok.*;
import org.springframework.http.ResponseEntity;
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor

public class EmailResponseDTO {

    private String code;

    private String userId;


    public EmailResponseDTO(String code, String userId) {
     this.userId = userId;
     this.code = code;
    }
}
