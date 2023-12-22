package com.ictedu.dogether.adoptApi.AdoptDto.response;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptResponseDTO {

    private String desertionNo;
    private String kindCd;
    private String gender;
    private String weight;
    private String happenAddr;
    private String profileImg;
    private String neuterYn;
    private String age;
    private String colorCd;
    private String specialMark;
    private String careNm;
    private String careTel;
    private String careAddr;
    private String orgNm;
    private String chargeNm;
    private String officeTel;


    public AdoptResponseDTO(Adopt adopt) {
        this.desertionNo = adopt.getDesertionNo();
        this.kindCd = adopt.getKindCd();
        this.gender = adopt.getGender();
        this.weight = adopt.getWeight();
        this.happenAddr = adopt.getHappenAddr();
        this.profileImg = adopt.getProfileImg();
        this.neuterYn = adopt.getNeuterYn();
        this.age = adopt.getAge();
        this.colorCd = adopt.getColorCd();
        this.specialMark = adopt.getSpecialMark();
        this.careNm = adopt.getCareNm();
        this.careTel = adopt.getCareTel();
        this.careAddr = adopt.getCareAddr();
        this.orgNm = adopt.getOrgNm();
        this.chargeNm = adopt.getChargeNm();
        this.officeTel = adopt.getOfficeTel();
    }


}
