package com.ictedu.dogether.adoptApi.AdoptDto.response;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.Entity.Wish;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptResponseDTO {

    private int wishNo;
    private String noticeSdt;
    private String noticeEdt;
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
        this.noticeSdt =adopt.getNoticeSdt();
        this.noticeEdt = adopt.getNoticeEdt();
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


    public AdoptResponseDTO(Wish wish) {
        this.wishNo = wish.getWishNo();
        this.noticeSdt =wish.getAdopt().getNoticeSdt();
        this.noticeEdt = wish.getAdopt().getNoticeEdt();
        this.desertionNo = wish.getAdopt().getDesertionNo();
        this.kindCd = wish.getAdopt().getKindCd();
        this.gender = wish.getAdopt().getGender();
        this.weight = wish.getAdopt().getWeight();
        this.happenAddr = wish.getAdopt().getHappenAddr();
        this.profileImg = wish.getAdopt().getProfileImg();
        this.neuterYn = wish.getAdopt().getNeuterYn();
        this.age = wish.getAdopt().getAge();
        this.colorCd = wish.getAdopt().getColorCd();
        this.specialMark = wish.getAdopt().getSpecialMark();
        this.careNm = wish.getAdopt().getCareNm();
        this.careTel = wish.getAdopt().getCareTel();
        this.careAddr = wish.getAdopt().getCareAddr();
        this.orgNm = wish.getAdopt().getOrgNm();
        this.chargeNm = wish.getAdopt().getChargeNm();
        this.officeTel = wish.getAdopt().getOfficeTel();
    }
}
