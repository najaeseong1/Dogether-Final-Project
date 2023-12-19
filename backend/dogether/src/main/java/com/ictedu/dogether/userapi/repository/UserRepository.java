package com.ictedu.dogether.userapi.repository;

import com.ictedu.dogether.userapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, String> {
    
    // 아이디 찾기에 사용되는 JPA 메서드
    User findByUserNameAndUserEmail(String userName, String userEmail);

    // 비밀번호 찾기에 사용되는 JPA 메서드
    User findByUserIdAndUserEmail(String userId, String userEmail);

    // 비밀번호를 찾고 임시비밀번호를 발급해주는 메서드
    @Modifying
    @Query("UPDATE User u SET u.userPass = :userPass WHERE u.userId = :userId")
    void updateUserPassword(@Param("userId") String userId, @Param("userPass") String userPass);

}
