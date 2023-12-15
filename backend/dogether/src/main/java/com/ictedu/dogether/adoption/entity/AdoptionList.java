package com.ictedu.dogether.adoption.entity;


import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter @Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "adopt")
public class AdoptionList {

    @Id
    @Column(name = "desertion_no", nullable = false)
    //@GeneratedValue(generator = "system-uuid")
    //@GenericGenerator(name = "system_uuid", strategy = "uuid")
    private int desertionNo;  // 유기번호(PK)

    @Column(nullable = false)
    private String kindCd; // 견종

    @Column(nullable = false)
    private String gender; // 성별

    @Column(nullable = false)
    private int weight; // 몸무게

    @Column(nullable = false)
    private String happenAddress; // 발견장소

    @Column(nullable = false)
    private String phoneNumber; // 보호소 연락처

    @Column(nullable = false)
    private String profileImg; // 이미지(유기견)

    @Column(nullable = false)
    private String specialMark; // 특이사항

    @Column(nullable = false)
    private boolean neuterYn; // 중성화 여부

    @Column(nullable = false)
    private String age; // 나이

    @Column(nullable = false)
    private String colorCd;  // 색상

    @Column(nullable = false)
    private String careNm; // 보호소 이름

    @Column(nullable = false)
    private String careTel; // 보호소 전화번호

    @Column(nullable = false)
    private String careAddr; // 보호 장소

    @Column(nullable = false)
    private String orgNm; // 관할기관

    @Column(nullable = false)
    private String chargeNm; // 담당자

    @Column(nullable = false)
    private String officeTel; // 담당자 연락처







}
