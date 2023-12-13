package com.ictedu.dogether.Board.api;


import com.ictedu.dogether.Board.dto.request.boardRegistRequestDTO;
import com.ictedu.dogether.Board.dto.response.BoardRegistResponseDTO;
import com.ictedu.dogether.Board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
    private final BoardService boardService;

//글 작성하기
    @PostMapping("/regist")
    public ResponseEntity<?> boardRegist(
            @Validated @RequestPart("board") boardRegistRequestDTO dto,
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,
            BindingResult result) {

        log.info("/board/ 글 작성 요청 들어옴 ");
        if(result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = null; //기본값이  null임
            if(imageFile !=null) {
                log.info("이미지 파일 요청 들어왔음");
                uploadFilePath = boardService.uploadImage(imageFile);
            }
            BoardRegistResponseDTO responseDTO = boardService.regist(dto, uploadFilePath);
            return ResponseEntity.ok().body(responseDTO);

        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.internalServerError().build();
        }





    }



//글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify() {

        return null;
    }

    //글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int boardNo) {
        boardService.delete(boardNo);
        return null;
    }





}
