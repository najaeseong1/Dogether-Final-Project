package com.ictedu.dogether.Board.Entity;

import lombok.*;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {

    private String boardNo; //글 번호

    private String content; //글 내용

    private LocalDateTime createDate; // 작성일자

    private LocalDateTime updateDate; //수정 일자

    private String title; //글 제목 

    private String category; //글 카테고리

    private String image; //글 이미지

    //유저 정보 업데이트 예정

}
