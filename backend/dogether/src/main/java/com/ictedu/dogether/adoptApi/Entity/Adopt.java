package com.ictedu.dogether.adoptApi.Entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Adopt {

    @Id
    @Column(name = "desertion_no")
    private String desertionNo; //유기번호

    @Column(name = "kind_cd")
    private String kindCd; //견종


    @Column(name = "notice_sdt")
    private String noticeSdt; //접수일 

    @Column(name = "notice_edt") //공고일
    private String noticeEdt;

    private String gender;

    private String weight;

    @Column(name = "happen_addr")
    private String happenAddr; //발견장소

    @Column(name = "profile_img")
    private String profileImg; //이미지

    @Column(name = "neuter_yn")
    private String neuterYn; // 중성화 여부

    private String age; //나이

    @Column(name = "color_cd")
    private String colorCd; //색깔

    @Column(name = "special_mark")
    private String specialMark; // 특이사항

    @Column(name = "care_nm")
    private String careNm; //보호소 이름

    @Column(name = "care_tel")
    private String careTel; //보호소 연락처

    @Column(name = "care_addr")
    private String careAddr; //보호장소

    @Column(name = "org_nm")
    private String orgNm;  //관활기관 (예) 충청남도 아산시 ~

    @Column(name = "charge_nm")
    private String chargeNm; //담당자

    @Column(name = "office_tel")
    private String officeTel; //담당자 연락처









}
