package com.ictedu.dogether.Board.dto.request;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.Board.Entity.Reply;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyRequestDTO {


    //게시물 번호, 아이디 , 댓글 내용
    @NotBlank
    private int boardNo;

    @NotBlank
    private String userId;

    @NotBlank
    private String replyContent;

    public Reply toEntity(Board board) {
        return Reply.builder()
                .replyContent(this.replyContent)
                .board(board)
                .build();
        
    }
}
