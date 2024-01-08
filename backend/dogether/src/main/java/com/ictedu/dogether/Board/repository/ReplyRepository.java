package com.ictedu.dogether.Board.repository;

import com.ictedu.dogether.Board.Entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {


    @Query("SELECT r FROM Reply r WHERE r.board.boardNo = :boardNo")
    List<Reply> findRepliesByBoardNo(@Param("boardNo") int boardNo);
}
