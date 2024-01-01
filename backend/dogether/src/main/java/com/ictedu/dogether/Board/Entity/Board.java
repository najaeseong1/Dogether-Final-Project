package com.ictedu.dogether.Board.Entity;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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



    @UpdateTimestamp
    private LocalDateTime updateDate; //수정 일자

    @Column(nullable = false)
    private String title; //글 제목 

    @Column(nullable = false)
    private String category; //글 카테고리


    private String image; //글 이미지

    //한명의 유저는 여러개의 게시물을 가질 수 있다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =  "user_id" )
    private User user;


    // 게시물 삭제될때 foreign key 오류로 인해 설정한거
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();
}
