package com.ictedu.dogether.adoption.repository;

import com.ictedu.dogether.adoption.entity.AdoptionList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRepository extends JpaRepository<AdoptionList, Integer> {

    //유기견 정보 조회
    

}
