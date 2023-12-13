package com.ictedu.dogether.Board.Entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no")
    private int boardNo; //글 번호

    @Column(nullable = false)
    private String content; //글 내용

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDate; // 작성일자

    @UpdateTimestamp
    private LocalDateTime updateDate; //수정 일자

    @Column(nullable = false)
    private String title; //글 제목 

    @Column(nullable = false)
    private String category; //글 카테고리


    private String image; //글 이미지

    //유저 정보 업데이트 예정

}
