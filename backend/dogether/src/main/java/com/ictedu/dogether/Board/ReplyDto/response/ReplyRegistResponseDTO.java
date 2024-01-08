package com.ictedu.dogether.Board.ReplyDto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ictedu.dogether.Board.Entity.Reply;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyRegistResponseDTO {

    private int replyNo;

    //작성자
    private String userId;

    //댓글 내용
    private String replyContent;

    //등록 일자
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registDate;

    //등록 일자
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifyDate;


    public ReplyRegistResponseDTO(Reply reply) {
        this.replyNo  = reply.getReplyNo();
        this.userId=reply.getUser().getUserId();
        this.replyContent = reply.getReplyContent();
        this.registDate = reply.getUpdateDate();
        this.modifyDate=reply.getUpdateDate();

    }
}
