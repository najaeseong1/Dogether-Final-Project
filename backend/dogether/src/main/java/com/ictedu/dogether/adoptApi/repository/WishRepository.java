package com.ictedu.dogether.adoptApi.repository;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.Entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    // 사용자 아이디로 좋아요한 게시물 조회
    List<Wish> findDesertionNoByUserUserId(String userId);


}
