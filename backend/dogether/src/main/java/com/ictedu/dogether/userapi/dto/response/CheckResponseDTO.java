package com.ictedu.dogether.userapi.dto.response;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class CheckResponseDTO {

    String code;

    public CheckResponseDTO(String code) {
        this.code = code;
    }

}
