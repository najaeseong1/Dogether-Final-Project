package com.ictedu.dogether.Board.dto.request;

import com.ictedu.dogether.Board.Entity.Board;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class boardRegistRequestDTO {

@NotBlank
    @Size(min = 1)
    private String title;

    @NotBlank
    @Size(min = 1)
    private String content;

    @NotBlank
    private String category;

    public Board toEntity(String uploadRootPath) {
       return Board.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
               .image(uploadRootPath)
                .build();
    }
}
