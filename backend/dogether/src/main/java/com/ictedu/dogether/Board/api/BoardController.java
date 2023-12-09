package com.ictedu.dogether.Board.api;


import com.ictedu.dogether.Board.dto.request.boardRegistRequestDTO;
import com.ictedu.dogether.Board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin
public class BoardController {
    private final BoardService boardService;

//글 작성하기
    @PostMapping("/")
    public ResponseEntity<?> boardRegist(boardRegistRequestDTO dto) {
        boardService.regist(dto);

        return null;
    }



}
