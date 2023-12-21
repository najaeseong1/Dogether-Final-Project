package com.ictedu.dogether.Adimin.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminPageRegistDTO {

        //여기서 입양신청서 번호, 거절사유(null허용) 승인, 거절 상태
        @NotBlank
        private int contractNo; //입양신청서 번호


        private String reasonsRefusal; // 거절 사유

        @NotBlank
        private boolean adoptionStatus; //입양 승인 | 거절

}
