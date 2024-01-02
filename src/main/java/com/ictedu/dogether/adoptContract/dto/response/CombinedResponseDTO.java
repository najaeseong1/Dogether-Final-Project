package com.ictedu.dogether.adoptContract.dto.response;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CombinedResponseDTO {

    private int contractNo;

    private String userName;//이름

    private int userAge; //나이

    private boolean petStatus; //반려동물 여부

    private String job; //직업

    private String userEmail; //이메일

    private String userPhone; //전화번호

    private String postAddr; //주소

    private String reason;  //입양 사유

    private String desertionNo; //유기번호


    private String kindCd; //품종
    private String gender; //성별

    private String happenAddr;//발견장소

    private String neuterYn; //중성화 여부
    private String age; //나이
    private String specialMark; //특이사항
    private String careNm; //보호소 이름



    public CombinedResponseDTO(AdoptContract adoptContract) {
        this.contractNo = adoptContract.getContractNo();
        this.userName = adoptContract.getUserName();
        this.userAge = adoptContract.getUserAge();
        this.petStatus = adoptContract.isPetStatus();
        this.job = adoptContract.getJob();
        this.userEmail = adoptContract.getUserEmail();
        this.userPhone = adoptContract.getUserPhone();
        this.postAddr = adoptContract.getPostAddr();
        this.reason = adoptContract.getReason();;
        this.desertionNo = adoptContract.getAdopt().getDesertionNo();
        this.kindCd = adoptContract.getAdopt().getKindCd();
        this.gender = adoptContract.getAdopt().getGender();
        this.happenAddr = adoptContract.getAdopt().getHappenAddr();
        this.neuterYn = adoptContract.getAdopt().getNeuterYn();
        this.age = adoptContract.getAdopt().getAge();
        this.specialMark = adoptContract.getAdopt().getSpecialMark();
        this.careNm = adoptContract.getAdopt().getCareNm();


    }
}
