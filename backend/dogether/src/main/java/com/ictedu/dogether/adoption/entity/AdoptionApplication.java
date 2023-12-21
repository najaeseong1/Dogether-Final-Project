package com.ictedu.dogether.adoption.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter @Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "contract")
public class AdoptionApplication {

    @Id
    @Column(nullable = false)
    private int contractNo; // 입양번호 (pk)

    @Column(nullable = false)
    private int age; // 나이

    @Column(nullable = false)
    private String reason;  // 입양 사유

    @Column(nullable = false)
    private String job; // 직업

    private int desertionNo; // 유기번호(FK => 분양게시글)

    @Column(nullable = false)
    private String userId; // 회원아이디(FK => 회원)

    @Column(nullable = false)
    private boolean petStatus; // 반려동물 여부




}
