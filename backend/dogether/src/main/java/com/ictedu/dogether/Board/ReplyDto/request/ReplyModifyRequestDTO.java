package com.ictedu.dogether.Board.ReplyDto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyModifyRequestDTO {

    @NotBlank
    private int replyNo;

    @NotBlank
    private String replyContent;

    @NotBlank
    private int boardNo;


}
