package com.ictedu.dogether.Board.BoardDto.request;


import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardModifyRequestDTO {

    @NotBlank
    private int boardNo;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String category;





}
