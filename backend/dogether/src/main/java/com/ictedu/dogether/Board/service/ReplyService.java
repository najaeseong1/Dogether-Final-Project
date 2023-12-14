package com.ictedu.dogether.Board.service;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.Board.dto.request.ReplyRequestDTO;
import com.ictedu.dogether.Board.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReplyService {

    private final ReplyRepository replyRepository;

    //댓글 등록
    public void replySave(ReplyRequestDTO dto) {
        




    }



    //댓글 삭제
    public void delete(int replyNo) {
        replyRepository.deleteById(replyNo);
    }
}
