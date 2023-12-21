package com.ictedu.dogether.adoptContract.repository;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//입양 신청서 레파지토리
public interface ContractRepository extends JpaRepository<AdoptContract, Integer> {

    List<AdoptContract> findByAdopt_DesertionNo(String desertionNo);




}
