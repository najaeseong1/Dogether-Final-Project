package com.ictedu.dogether.Board.service;

import com.ictedu.dogether.Board.dto.request.boardRegistRequestDTO;
import com.ictedu.dogether.Board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    public void regist(boardRegistRequestDTO dto) {
        //boardRepository.save(dto.toEntity(dto));
    }
}
