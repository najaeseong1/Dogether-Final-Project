package com.ictedu.dogether.Board.BoardDto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardListResponseDTO {

    private List<BoardRegistResponseDTO> boards;
}
