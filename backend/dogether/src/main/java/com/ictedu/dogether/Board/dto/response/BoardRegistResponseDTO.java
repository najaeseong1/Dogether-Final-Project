package com.ictedu.dogether.Board.dto.response;

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

    public BoardRegistResponseDTO(Board board) {
            this.title = board.getTitle();
            this.content = board.getContent();
            this.category = board.getCategory();
            this.registDate = board.getCreateDate();
    }
}
