package com.ictedu.dogether.Board.api;


import com.ictedu.dogether.Board.BoardDto.request.BoardModifyRequestDTO;
import com.ictedu.dogether.Board.BoardDto.request.BoardRegistRequestDTO;
import com.ictedu.dogether.Board.ReplyDto.request.ReplyModifyRequestDTO;
import com.ictedu.dogether.Board.ReplyDto.request.ReplyRequestDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardListResponseDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardModifyResponseDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardRegistResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyListResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyModifyResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyRegistResponseDTO;
import com.ictedu.dogether.Board.service.BoardService;
import com.ictedu.dogether.auth.TokenUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin
public class BoardController {

    private final BoardService boardService;


    //자유게시판 글 작성하기
    @PostMapping("/regist")
    public ResponseEntity<?> boardRegist(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @Validated @RequestPart("board") BoardRegistRequestDTO dto,
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,
            BindingResult result) {

        log.info("/board/ 글 작성 요청 들어옴 ");
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = getUploadFilePath(imageFile); //여기 메서드 추출한 거 사용

            BoardRegistResponseDTO responseDTO = boardService.regist(dto, uploadFilePath, userInfo);
            log.info("받아온 dto -{}", responseDTO);
            return ResponseEntity.ok().body(responseDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }


    }

    //파일 경로를 리턴할 메서드 추출
    private String getUploadFilePath(MultipartFile imageFile) throws IOException {
        String uploadFilePath = null; //기본값이  null임
        if (imageFile != null) {
            log.info("이미지 파일 요청 들어왔음");
            uploadFilePath = boardService.uploadImage(imageFile);
            log.info("이미지 경로 요청 들어옴 ");
        }
        return uploadFilePath;
    }


    //자유 게시판 글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,
             BoardModifyRequestDTO dto,
            @AuthenticationPrincipal TokenUserInfo userInfo,
            BindingResult result) {


        log.info("/modify/ 글 수정 요청이 들어옴  ");
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = getUploadFilePath(imageFile); //여기 메서드 추출한 거 사용
            BoardModifyResponseDTO modifyDTO = boardService.modify(dto, uploadFilePath, userInfo);
            return ResponseEntity.ok().body(modifyDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    //게시판 글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int boardNo,
                                    @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        boardService.delete(boardNo, userInfo);
        return ResponseEntity.ok().build(); //성공하면 200
    }



    //게시판 글 목록 불러오기
    @GetMapping("/")
    public ResponseEntity<?> boarList() {
        BoardListResponseDTO boardList = boardService.getList();
        return ResponseEntity.ok(boardList);
    }

    //마이페이지에서 내 게시판 글 목록 불러오기
    @GetMapping("/myBoardList/{userId}")
    public ResponseEntity<?> myBoardList(@PathVariable String userId) {
        log.info("마이페이지에서 내 게시판 글 목록 끌고 오기 -{}", userId);

        try {
            BoardListResponseDTO myBoardList = boardService.getMyBoardList(userId);
            return ResponseEntity.ok().body(myBoardList);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }



    //댓글 등록
    @PostMapping("/reply")
    public ResponseEntity<?> replySave(@RequestBody ReplyRequestDTO dto,
                                       @AuthenticationPrincipal TokenUserInfo userInfo,
                                       BindingResult result
    ) {

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }

        try {
            ReplyRegistResponseDTO replyRegistResponseDTO = boardService.replySave(dto, userInfo);
            return ResponseEntity.ok().body(replyRegistResponseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

    }

    //댓글 삭제
    @DeleteMapping("/reply/{replyNo}")
    public ResponseEntity<?> deleteReply(@PathVariable("replyNo") int replyNo,
                                         @AuthenticationPrincipal TokenUserInfo userInfo
    ) {

        log.info("댓글 삭제 요청 들어옴 !");
        boardService.deleteReply(replyNo, userInfo);
        return ResponseEntity.ok().build();
    }


    //댓글 수정
    @PutMapping("/replyModify")
    public ResponseEntity<?> replyModify( ReplyModifyRequestDTO dto,
            @AuthenticationPrincipal TokenUserInfo userInfo,
            BindingResult result
    ) {
        log.info("댓글 수정 요청 들어옴 ");
            log.info("컨트롤러 dto의 값 -{}", dto);
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }

        try {
            ReplyModifyResponseDTO replyModifyResponseDTO = boardService.replyModify(dto, userInfo);
           return  ResponseEntity.ok().body(replyModifyResponseDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }


        //댓글 목록 요청
        @GetMapping("/replyList/{boardNo}")
        public ResponseEntity<?> replyList(@PathVariable("boardNo") int boardNo) {
        log.info("댓글 목록 요청 들어옴 !");
            ReplyListResponseDTO replyList = boardService.getReplyList(boardNo);

            return ResponseEntity.ok().body(replyList);
        }





}