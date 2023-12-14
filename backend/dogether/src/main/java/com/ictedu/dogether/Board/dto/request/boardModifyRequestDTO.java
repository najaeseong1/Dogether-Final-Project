package com.ictedu.dogether.Board.dto.request;


import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class boardModifyRequestDTO {

    @NotBlank
    private int boardNo;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String category;


}
