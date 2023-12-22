package com.ictedu.dogether.adoptContract.dto.response;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class myPageApprovedDTO {

    private String desertionNo; //유기번호
    private String kindCd; //품종
    private String gender; //성별

    private String happenAddr;//발견장소

    private String colorCd;  //색깔

    private AdoptionStatus adoptionStatus;
    private String neuterYn; //중성화 여부
    private String age; //나이
    private String specialMark; //특이사항
    private String careNm; //보호소 이름

    private String careAddr; //보호소 주소

    private String careTel; //보호소 전화번소

    private String orgNm; //관할기관

    private String chargeNm; // 담당자


    private String officeTel; //담당자 연락천

    private String reasonsRefusal;



//입양 승인용 생성자
    public myPageApprovedDTO(AdoptContract targetAdoption) {
        this.adoptionStatus = targetAdoption.getAdoptionStatus();
        this.desertionNo = targetAdoption.getAdopt().getDesertionNo();
        this.kindCd = targetAdoption.getAdopt().getKindCd();
        this.gender = targetAdoption.getAdopt().getGender();
        this.happenAddr = targetAdoption.getAdopt().getHappenAddr();
        this.colorCd = targetAdoption.getAdopt().getColorCd();
        this.neuterYn = targetAdoption.getAdopt().getNeuterYn();
        this.age = targetAdoption.getAdopt().getAge();
        this.specialMark = targetAdoption.getAdopt().getSpecialMark();
        this.careNm = targetAdoption.getAdopt().getCareNm();
        this.careAddr = targetAdoption.getAdopt().getCareAddr();
        this.careTel = targetAdoption.getAdopt().getCareTel();
        this.orgNm = targetAdoption.getAdopt().getOrgNm();
        this.chargeNm = targetAdoption.getAdopt().getChargeNm();
        this.officeTel = targetAdoption.getAdopt().getOfficeTel();

    }


    //입양 거절 용 생성자
    public myPageApprovedDTO(AdoptContract targetAdoption, String reasonsRefusal) {
        this.adoptionStatus = targetAdoption.getAdoptionStatus();
        this.desertionNo = targetAdoption.getAdopt().getDesertionNo();
        this.kindCd = targetAdoption.getAdopt().getKindCd();
        this.gender = targetAdoption.getAdopt().getGender();
        this.happenAddr = targetAdoption.getAdopt().getHappenAddr();
        this.colorCd = targetAdoption.getAdopt().getColorCd();
        this.neuterYn = targetAdoption.getAdopt().getNeuterYn();
        this.age = targetAdoption.getAdopt().getAge();
        this.specialMark = targetAdoption.getAdopt().getSpecialMark();
        this.reasonsRefusal = reasonsRefusal;
    }
}
