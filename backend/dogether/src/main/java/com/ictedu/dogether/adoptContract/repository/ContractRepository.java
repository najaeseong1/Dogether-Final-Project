package com.ictedu.dogether.adoptContract.repository;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//입양 신청서 레파지토리
public interface ContractRepository extends JpaRepository<AdoptContract, Integer> {

    //관리자 속 입양 상세 페이지 목록 반환
    List<AdoptContract> findByAdopt_DesertionNo(String desertionNo);


    //마이페이지 속 입양 상세 페이지 승인 상세 페이지 반환
    AdoptContract findByUser_UserIdAndAdopt_DesertionNo(String userId, String desertionNo);



    //입양 승인 | 거절에 따라 목록 반환
    List<AdoptContract> findByAdoptionStatus(AdoptionStatus adoptionStatus);

    
    //사용자 아이디를 주면 입양 신청서 목록이 옴
    List<AdoptContract> findByUserUserId(String userId);

}
