package com.ictedu.dogether.Board.BoardDto.response;

import com.ictedu.dogether.Board.Entity.Board;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardModifyResponseDTO {

    private int boardNo;

    private String title;

    private String content;

    private String category;

    private LocalDateTime updateDate;

    private String userId;

    public BoardModifyResponseDTO(Board modifyBoard) {
        this.boardNo = modifyBoard.getBoardNo();
        this.title = modifyBoard.getTitle();
        this.content = modifyBoard.getContent();
        this.category = modifyBoard.getCategory();
        this.userId = modifyBoard.getUser().getUserId();
        this.updateDate = modifyBoard.getUpdateDate();
    }
}
