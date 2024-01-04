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
import com.ictedu.dogether.aws.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin
public class BoardController {

    private final BoardService boardService;

    private final S3Service s3Service;


    //자유게시판 글 작성하기
    @PostMapping("/regist")
    public ResponseEntity<?> boardRegist(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @Validated @RequestPart("board") BoardRegistRequestDTO dto,
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,

            BindingResult result) {

        log.info("/board/ 글 작성 요청 들어옴 ");


        if (result.hasErrors()) {
//            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = getUploadFilePath(imageFile); //여기 메서드 추출한 거 사용
            log.info("보드 컨트롤러 에서 String uploadFilePath = getUploadFilePath(imageFile); 받은 값 {} ",uploadFilePath);

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

    //게시판 글 상세보기
    @GetMapping("/detail/{boardNo}")
    public ResponseEntity<?> boardDetail( @PathVariable  int boardNo,
                                         @AuthenticationPrincipal TokenUserInfo userInfo) {

        try {
            BoardRegistResponseDTO detail = boardService.getDetail(boardNo);
            return ResponseEntity.ok().body(detail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    //사진 이미지 데이터 응답 처리
    @GetMapping("load-profile/{boardNo}")
    public  ResponseEntity<?> loadFile(@PathVariable int boardNo) {
        log.info("\n\n\n\n@GetMapping(\"load-profile/{boardNo}\") 요청이 들어왔어요 히히 ");
        try {
            // 클라이언트가 요청한 프로필 사진을 응답해야 함.
            // 1. 사진의 경로부터 얻어야 한다!
            String imagePath = boardService.findImagePath(boardNo);
            log.info("\n\n\n 컨트롤러에서 사진의 경로 얻기 boardService.findImagePath(boardNo); === {} ",imagePath);
            // 1-2 얻어낸 사진의 경로가 S3에 저장된 것을 확인하기 위해 https: 가 포함된 것을 확인
            if(imagePath.contains("https:")) {
                byte[] fileData = s3Service.downloadFromS3Bucket(imagePath);

                // 2-2. S3에서 발견된 파일을 따로 처리 하기 위함
                HttpHeaders headers = new HttpHeaders();
                MediaType contentType = findExtensionAndGetMediaType(imagePath);
                if (contentType == null) {
                    return ResponseEntity.internalServerError()
                            .body("발견된 파일은 이미지 파일이 아닙니다.");
                }
                headers.setContentType(contentType);
                return ResponseEntity.ok().headers(headers).body(fileData);
            }
            // 2. 얻어낸 파일 경로를 통해 실제 파일 데이터를 로드하기.
            File imageFile = new File(imagePath);

            log.info("\n\n\n 실제로 파일 데이터로 만드는게 실패하는거임? NEW imageFile === {}", imageFile);

            // 모든 게시글은 사진을 가지는 것은 아니다. -> 사진이 없는 사람들은 경로가 존재하지 않을 것이다.
            // 만약 존재하지 않는 경로라면 클라이언트로 404 status를 리턴.
            if(!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }
            // 해당 경로에 저장된 파일을 바이트 배열로 직렬화 해서 리턴.
            byte[] fileData = FileCopyUtils.copyToByteArray(imageFile);

            // 3. 응답 헤더에 컨텐츠 타입을 설정.
            HttpHeaders headers = new HttpHeaders();
            MediaType contentType = findExtensionAndGetMediaType(imagePath);
            if(contentType == null) {
                return ResponseEntity.internalServerError()
                        .body("발견된 파일은 이미지 파일이 아닙니다.");
            }
            headers.setContentType(contentType);
            return ResponseEntity.ok().headers(headers).body(fileData);
        } catch (IOException e) {
            e.printStackTrace();
          return ResponseEntity.internalServerError().body("파일을 찾을 수 없습니다.");
        }

    }




    //파일 경로를 리턴할 메서드 추출
    private String getUploadFilePath(MultipartFile imageFile) throws IOException {
        String uploadFilePath = null; //기본값이  null임
        if (imageFile != null) {
            log.info("이미지 파일 요청 들어왔음 MultipartFile === {} ", imageFile);
            uploadFilePath = boardService.uploadImage(imageFile);
            log.info("이미지 경로 요청 들어옴 ");
        }
        return uploadFilePath;
    }


    private MediaType findExtensionAndGetMediaType(String filePath) {

        //파일 경로에서 확장자를 추출
        //C:/todo_upload/sdjklfjksf_abc.jpg
        //.다음부터 끝까지
        String ext = filePath.substring(filePath.lastIndexOf(".") + 1);


        //추출한 확장자를 바탕으로 MediaType을 설정. ->  Header에 들어갈 Content-type이 됨
        switch (ext.toUpperCase()) {
            case "JPG" : case "JPEG":
                return MediaType.IMAGE_JPEG;
            case "PNG":
                return  MediaType.IMAGE_PNG;
            case  "GIF" :
                return MediaType.IMAGE_GIF;
            default:
                return null; //이 확장자들이 아니라면 이미지 파일이 아닌것임 즉 null 리턴
        }

    }
    //자유게시판 글 끌어오기 (수정 베이스)



    //자유 게시판 글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(
            @RequestPart(value = "ImageFile", required = false) MultipartFile imageFile,
            @RequestPart(value = "oldFile", required = false) MultipartFile oldFile,
             @RequestPart("board") BoardModifyRequestDTO dto,
            @AuthenticationPrincipal TokenUserInfo userInfo,
            BindingResult result) {

    log.info("ImageFile-{}", imageFile);
    log.info("oldFile -{}", oldFile);
        log.info("/modify/ 글 수정 요청이 들어옴  ");
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadFilePath = getUploadFilePath(imageFile);
            log.info("새로운 파일 경로 -{}", uploadFilePath);//여기 메서드 추출한 거 사용
            BoardModifyResponseDTO modifyDTO = boardService.modify(dto, uploadFilePath, userInfo, oldFile);
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
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<?> delete(@PathVariable("boardNo") int boardNo,
                                    @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        boardService.delete(boardNo, userInfo);
        return ResponseEntity.ok().build(); //성공하면 200
    }



    //게시판 글 목록 불러오기
    @GetMapping
    public ResponseEntity<?> boarList() {
        BoardListResponseDTO boardList = boardService.getList();
        return ResponseEntity.ok(boardList);
    }

    //마이페이지에서 내 게시판 글 목록 불러오기
    @GetMapping("/myboardlist/{userId}")
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
            ReplyListResponseDTO replyListResponseDTO = boardService.replySave(dto, userInfo);
            return ResponseEntity.ok().body(replyListResponseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

    }

    //댓글 삭제
    @DeleteMapping("/reply/{boardNo}/{replyNo}")
    public ResponseEntity<?> deleteReply(@PathVariable("replyNo") int replyNo,
                                         @PathVariable("boardNo") int boardNo,
                                         @AuthenticationPrincipal TokenUserInfo userInfo
    ) {

        log.info("댓글 삭제 요청 들어옴 !");
        try {
            ReplyListResponseDTO replyListResponseDTO = boardService.deleteReply(replyNo, userInfo, boardNo);
            return ResponseEntity.ok().body(replyListResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //댓글 수정
    @PutMapping("/replymodify")
    public ResponseEntity<?> replyModify( @RequestBody ReplyModifyRequestDTO dto,
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
            ReplyListResponseDTO replyListResponseDTO = boardService.replyModify(dto, userInfo);
            return  ResponseEntity.ok().body(replyListResponseDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }


        //댓글 목록 요청
        @GetMapping("/replylist/{boardNo}")
        public ResponseEntity<?> replyList(@PathVariable("boardNo") int boardNo) {
        log.info("댓글 목록 요청 들어옴 !");
            ReplyListResponseDTO replyList = boardService.getReplyList(boardNo);

            return ResponseEntity.ok().body(replyList);
        }

        //s3에서 불러온 이미지 사진 처리
        @GetMapping("/load-s3/{boardNo}")
        public ResponseEntity<?> loadS3(@RequestParam int boardNo) {
        log.info("load-s3 -{}", boardNo);

            try {
                String imagePath = boardService.findImagePath(boardNo);
                return ResponseEntity.ok().body(imagePath);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(e.getMessage());
            }


        }






}