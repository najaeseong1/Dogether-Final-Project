package com.ictedu.dogether.userapi.repository;

import com.ictedu.dogether.userapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository
        extends JpaRepository<User, String> {

    //시용자 이메일 주면 그 사용자의 정보 다주는거
    User findByUserEmail(String email);


    //존재하는 이메일인지 확인
    boolean existsByUserEmail(String email);
}
