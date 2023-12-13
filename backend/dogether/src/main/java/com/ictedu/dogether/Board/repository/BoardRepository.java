package com.ictedu.dogether.Board.repository;

import com.ictedu.dogether.Board.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}
