package com.ictedu.dogether.Board.service;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.Board.Entity.Reply;
import com.ictedu.dogether.Board.dto.request.ReplyRequestDTO;
import com.ictedu.dogether.Board.dto.request.boardModifyRequestDTO;
import com.ictedu.dogether.Board.dto.request.boardRegistRequestDTO;
import com.ictedu.dogether.Board.dto.response.BoardRegistResponseDTO;
import com.ictedu.dogether.Board.repository.BoardRepository;
import com.ictedu.dogether.Board.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;

    @Value("${upload.path}")
    private String uploadRootPath;

    public BoardRegistResponseDTO regist(boardRegistRequestDTO dto, String uploadRootPath) {
        Board saved = boardRepository.save(dto.toEntity(uploadRootPath));

        return new BoardRegistResponseDTO(saved);
    }

    //사진 파일 저장하고 경로 리턴할 메서드
    public String uploadImage(MultipartFile imageFile) throws IOException {
           File rootDir = new File(uploadRootPath);
           if(!rootDir.exists()) rootDir.mkdir();

           //이름 충돌 가능성 배제하기
           String uniqueFileName = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();

           //파일 저장하기
        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);
        imageFile.transferTo(uploadFile);

        return uniqueFileName;
    }


    //게시물 삭제
    public void delete(int boardNo) {
        try {
        boardRepository.deleteById(boardNo);

        }catch (Exception e) {

        }


    }


    //게시물 수정
    public void modify(boardModifyRequestDTO dto, String uploadFilePath) {
        Board board = boardRepository.findById(dto.getBoardNo()).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );
        //사용자가 수정하 새 정보를 save 함
        boardRepository.save(board);
    }





}
