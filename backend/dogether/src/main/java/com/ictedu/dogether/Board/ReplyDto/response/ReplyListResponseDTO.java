package com.ictedu.dogether.Board.ReplyDto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyListResponseDTO {


    private List<ReplyRegistResponseDTO> ReplyLists;

}
