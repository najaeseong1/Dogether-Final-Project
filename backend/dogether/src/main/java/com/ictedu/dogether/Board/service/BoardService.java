package com.ictedu.dogether.Board.service;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.Board.Entity.Reply;
import com.ictedu.dogether.Board.BoardDto.request.BoardModifyRequestDTO;
import com.ictedu.dogether.Board.BoardDto.request.BoardRegistRequestDTO;
import com.ictedu.dogether.Board.ReplyDto.request.ReplyModifyRequestDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyListResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyModifyResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.request.ReplyRequestDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardListResponseDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardRegistResponseDTO;
import com.ictedu.dogether.Board.BoardDto.response.BoardModifyResponseDTO;
import com.ictedu.dogether.Board.ReplyDto.response.ReplyRegistResponseDTO;
import com.ictedu.dogether.Board.repository.BoardRepository;
import com.ictedu.dogether.Board.repository.ReplyRepository;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional

public class BoardService {

    private final UserRepository userRepository;

    private final BoardRepository boardRepository;

    private final ReplyRepository replyRepository;

    @Value("${upload.path}")
    private String uploadRootPath;

    //자유게시판 글 등록
    public BoardRegistResponseDTO regist(BoardRegistRequestDTO dto, String uploadRootPath
                                        , TokenUserInfo userInfo) {
            log.info("컨트롤러가 서비스에게 요청 보냈따 ");
            log.info(userInfo.getUserId());
            //회원 정보 찾기
        User user = getUser(userInfo.getUserId());
         log.info("서비스 쪽에서 회원정보-{}", user);
        Board saved = boardRepository.save(dto.toEntity(uploadRootPath, user));
         log.info("자유게시판에서 받아온 엔터티 -{}", saved);
        return new BoardRegistResponseDTO(saved);
    }

    //회원 정보 찾기 메서드
    private User getUser(String userId) {
        User user = userRepository.findById((userId)).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        return user;

    }




    //게시물 삭제
    public void delete(int boardNo, TokenUserInfo userInfo) {
        Board targetBoard = bringBoard(boardNo);


        if(!userInfo.getUserId().equals(targetBoard.getUser().getUserId())) {
            //작성자 아이다와 같으면 실행될 구문
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        boardRepository.deleteById(boardNo);

    }


    //게시물 수정
    public BoardModifyResponseDTO modify(BoardModifyRequestDTO dto, String uploadFilePath, TokenUserInfo userInfo) {

        //게시물 작성자 아이디랑 지금 요청온 아이디랑 비교
        Board targetBoard = bringBoard(dto.getBoardNo());

        //게시물
        if(!userInfo.getUserId().equals(targetBoard.getUser().getUserId())) {
            //작성자 아이다와 같으면 실행될 구문 
            throw new RuntimeException("수정 권한이 없습니다.");
        }
        
        Board board = boardRepository.findById(dto.getBoardNo()).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );

        board.setBoardNo(dto.getBoardNo());
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setCategory(dto.getCategory());
        board.setImage(uploadFilePath);

        //사용자가 수정할 새 정보를 save 함
        Board modifyBoard = boardRepository.save(board);
        return new BoardModifyResponseDTO(modifyBoard);





    }
    



    //글목록 받아오기
    public BoardListResponseDTO getList() {
        List<Board> boardList = boardRepository.findAll();

        List<BoardRegistResponseDTO> dtoList = boardList.stream()
                .map(BoardRegistResponseDTO::new)
                .collect(Collectors.toList()); //글목록 받아오기

        return BoardListResponseDTO.builder()
                .boards(dtoList)
                .build();
    }

        //////댓글 쪽 /////

    //댓글 등록
    public ReplyRegistResponseDTO replySave(ReplyRequestDTO dto, TokenUserInfo userInfo) {
        User user = getUser(userInfo.getUserId()); //댓글 등록하려는 해당 유저 정보

        Board board = bringBoard(dto.getBoardNo()); //댓글 등록하려는 해당 게시물 정보
        Reply reply = replyRepository.save(dto.toEntity(board, user));

        return new ReplyRegistResponseDTO(reply);



    }

    //댓글 삭제
    public void deleteReply(int replyNo, TokenUserInfo userInfo) {
        //삭제하려는 해당 댓글 정보
        Reply reply = bringWriter(replyNo);


        if(!userInfo.getUserId().equals(reply.getUser().getUserId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        replyRepository.deleteById(replyNo);

    }

    //댓글 수정
    public ReplyModifyResponseDTO replyModify(ReplyModifyRequestDTO dto, TokenUserInfo userInfo) {
        //댓글 작성자와 지금 댓글 수정을 누른 사람이 같은지를 비교해야 함
        log.info("dto의값:-{}", dto);
        Reply targetReply = bringWriter(dto.getReplyNo());

        if(!userInfo.getUserId().equals(targetReply.getUser().getUserId())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }
        targetReply.setReplyNo(dto.getReplyNo());
        targetReply.setReplyContent(dto.getReplyContent());


        Reply modifyReply = replyRepository.save(targetReply);

        return new ReplyModifyResponseDTO(modifyReply);
    }



    //게시물 댓글 리스트
    public ReplyListResponseDTO getReplyList(int boardNo) {
        List<Reply> getList = replyRepository.findRepliesByBoardNo(boardNo);

        List<ReplyRegistResponseDTO> replyList = getList.stream()
                .map(ReplyRegistResponseDTO::new)
                .collect(Collectors.toList());


        return ReplyListResponseDTO.builder().ReplyLists(replyList).build();

    }

    //마이페이지 속 내 게시물 리스트

    public BoardListResponseDTO getMyBoardList(String userId) {
        List<Board> findBoardList = boardRepository.findByUserUserId(userId);

        List<BoardRegistResponseDTO> dtoList = findBoardList.stream()
                .map(BoardRegistResponseDTO::new)
                .collect(Collectors.toList()); //글목록 받아오기

        return BoardListResponseDTO.builder()
                .boards(dtoList)
                .build();


    }








    //사진 파일 저장하고 경로 리턴할 메서드(이거 컨트롤러에서)
    public String uploadImage(MultipartFile imageFile) throws IOException {
        log.info("uploadImage 메서드 요청 들어옴 ");
        File rootDir = new File(uploadRootPath);
        if(!rootDir.exists()) rootDir.mkdir();

        //이름 충돌 가능성 배제하기
        String uniqueFileName = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
        log.info("파일이름 -{}",uniqueFileName);
        //파일 저장하기
        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);
        imageFile.transferTo(uploadFile);

        return uniqueFileName;
    }



    //게시물 찾기 메서드
    private Board bringBoard(int boardId) {
        return boardRepository.findById(boardId).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );
    }

    //해당 댓글 정보 가져오기 메서드
    private Reply bringWriter(int replyNo) {
        log.info("replyNo-{}", replyNo);
        return replyRepository.findById(replyNo).orElseThrow(
                () ->new RuntimeException("댓글 정보가 없습니다.")
        );
    }



}
