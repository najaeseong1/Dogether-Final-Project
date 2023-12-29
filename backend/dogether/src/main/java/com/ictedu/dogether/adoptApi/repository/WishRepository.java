package com.ictedu.dogether.adoptApi.repository;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.Entity.Wish;
import com.ictedu.dogether.userapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    // 사용자 아이디로 좋아요한 게시물 조회
    List<Wish> findDesertionNoByUserUserId(String userId);

    // 해당 사용자가 이미 특정 분양게시물에 대한 좋아요를 등록했는지 체크
    boolean existsByUserAndAdopt(User user, Adopt adopt);

}
