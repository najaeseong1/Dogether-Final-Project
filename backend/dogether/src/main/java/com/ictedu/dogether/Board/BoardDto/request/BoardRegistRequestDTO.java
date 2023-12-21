package com.ictedu.dogether.Board.BoardDto.request;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.userapi.entity.User;
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
public class BoardRegistRequestDTO {

@NotBlank
    @Size(min = 1)
    private String title;

    @NotBlank
    @Size(min = 1)
    private String content;

    @NotBlank
    private String category;

    public Board toEntity(String uploadRootPath, User user) {
       return Board.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
               .image(uploadRootPath)
               .user(user)
               .build();
    }
}
