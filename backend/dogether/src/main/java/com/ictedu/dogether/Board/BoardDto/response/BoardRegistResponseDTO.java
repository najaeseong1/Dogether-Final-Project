package com.ictedu.dogether.Board.BoardDto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class BoardRegistResponseDTO {



    private String title;

    private String content;

    private String category;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registDate;

    private String userId;

    private String image;

    private int boardNo;



    public BoardRegistResponseDTO(Board board) {
        this.boardNo = board.getBoardNo();
            this.title = board.getTitle();
            this.content = board.getContent();
            this.category = board.getCategory();
            this.registDate = board.getUpdateDate();
            this.userId =board.getUser().getUserId();
            this.image = board.getImage();
    }
}
