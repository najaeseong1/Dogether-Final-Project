package com.ictedu.dogether.Board.ReplyDto.request;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.Board.Entity.Reply;
import com.ictedu.dogether.userapi.entity.User;
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


    //게시물 번호,  댓글 내용
    @NotBlank
    private int boardNo;


    @NotBlank
    private String replyContent;

    public Reply toEntity(Board board, User user) {
        return Reply.builder()
                .replyContent(this.replyContent)
                .board(board)
                .user(user)
                .build();
        
    }

}
