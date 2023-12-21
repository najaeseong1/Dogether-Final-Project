package com.ictedu.dogether.Adimin.dto.request;


import com.ictedu.dogether.Adimin.Entity.Admin;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class statusRegistRequestDTO {

    @NotBlank
    private boolean adoptionStatus; //승인 | 거절


    private String reasonRefusal; //거절 사유  -> false가 온다면 있음 not null아님

    private String contractNo; //입양 거절 또는 승인하려는 그 입양 신청서 번호
//
//    public Admin toEntity() {
//        return Admin.builder()
//                .reasonsRefusal(this.reasonRefusal)
//                .adoptionStatus(this.adoptionStatus)
//                .build();
//    }
}
