package com.ictedu.dogether.adoptContract.repository;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//입양 신청서 레파지토리
public interface ContractRepository extends JpaRepository<AdoptContract, Integer> {

    //관리자 속 입양 상세 페이지 목록 반환
//    List<AdoptContract> findByAdopt_ContractNo(String contractNo);

    //똑같은 분양 게시물에 같은 사용자가 중복 되는 지 확인
    boolean existsByUser_UserIdAndAdopt_DesertionNo(String userId, String desertionNo);

    //마이페이지 속 입양 상세 페이지 승인 상세 페이지 반환
    AdoptContract findByUser_UserIdAndAdopt_DesertionNo(String userId, String desertionNo);

    // 사용자 아이디와 게시물 번호로 이미 등록된 신청서 조회


    //입양 승인 | 거절에 따라 목록 반환
    List<AdoptContract> findByAdoptionStatus(AdoptionStatus adoptionStatus);

    
    //사용자 아이디를 주면 입양 신청서 목록이 옴
    List<AdoptContract> findByUserUserId(String userId);

}
