package com.ictedu.dogether.Board.repository;

import com.ictedu.dogether.Board.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    //마이페이지 속 자신의 게시물 리스트
    List<Board> findByUserUserId(String userId);

}
