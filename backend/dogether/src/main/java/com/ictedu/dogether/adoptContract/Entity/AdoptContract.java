package com.ictedu.dogether.adoptContract.Entity;


//import com.ictedu.dogether.Adimin.Entity.Admin;
//import com.ictedu.dogether.Adimin.Entity.Admin;
import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.userapi.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name = "adopt_contract")
public class AdoptContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_no")
    private int contractNo;

    @Column(name = "user_name",  nullable = false)
    private String userName;

    @Column(name = "user_age",  nullable = false)
    private int userAge;

    @Column(name = "pet_status",  nullable = false)
    private boolean petStatus;

    @Column( nullable = false)
    private String job;


    @Column(name = "user_email",  nullable = false)
    private String userEmail;

    @Column(name = "user_phone",  nullable = false)
    private String userPhone;

    @Column(name = "post_addr",  nullable = false)
    private String postAddr;

    @Column( nullable = false)
    private String reason;


    @Column(name = "reason_refusal")
    private String reasonsRefusal; // 거절 사유


    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "adoption_status")
    private AdoptionStatus adoptionStatus =AdoptionStatus.PENDING; //입양 승인 거절 | 디폴트 값 : pending


    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDate; // 작성일자


    //분양게시물에 입양신청서 여러개가 있을 수 있다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "desertion_no")
    private Adopt adopt;


    //유저 한명에 입양신청서 여러개가 있을 수 있다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =  "user_id" )
    private User user;
//
//    //관리자 한명이 입양 신청서 여러개 가질 수 있다
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "admin_id")
//    private Admin admin;










}
