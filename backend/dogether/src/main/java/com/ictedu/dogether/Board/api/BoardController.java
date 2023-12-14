package com.ictedu.dogether.Board.api;


import com.ictedu.dogether.Board.dto.request.ReplyRequestDTO;
import com.ictedu.dogether.Board.dto.request.boardModifyRequestDTO;
import com.ictedu.dogether.Board.dto.request.boardRegistRequestDTO;
import com.ictedu.dogether.Board.dto.response.BoardRegistResponseDTO;
import com.ictedu.dogether.Board.service.BoardService;
import com.ictedu.dogether.Board.service.ReplyService;
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
    private final ReplyService replyService;


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
            String uploadFilePath = getUploadFilePath(imageFile); //여기 메서드 추출한 거 사용
            BoardRegistResponseDTO responseDTO = boardService.regist(dto, uploadFilePath);
            return ResponseEntity.ok().body(responseDTO);

        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.internalServerError().build();
        }





    }
//파일 경로를 리턴할 메서드 추출
    private String getUploadFilePath(MultipartFile imageFile) throws IOException {
        String uploadFilePath = null; //기본값이  null임
        if(imageFile !=null) {
            log.info("이미지 파일 요청 들어왔음");
            uploadFilePath = boardService.uploadImage(imageFile);
        }
        return uploadFilePath;
    }


    //글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,
            boardModifyRequestDTO dto,
                                    BindingResult result) {


        log.info("/modify/ 글 수정 요청이 들어옴  ");
        if(result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = getUploadFilePath(imageFile); //여기 메서드 추출한 거 사용
            boardService.modify(dto, uploadFilePath);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return null;
    }

    //글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int boardNo) {
        boardService.delete(boardNo);
        return null;
    }

    //댓글 등록
    @PostMapping("/reply")
    public ResponseEntity<?> replySave(@RequestBody ReplyRequestDTO dto) {
        boardService.replySave(dto);
        return null;
    }
    
    //댓글 삭제
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteReply(@PathVariable("id") int replyNo) {
        //여기 토큰 필요
        log.info("댓글 삭제 요청 들어옴 !");
    replyService.delete(replyNo);
    return null;
    }
    //댓글 수정





}
