package com.ictedu.dogether.Board.Entity;

import com.ictedu.dogether.userapi.entity.User;
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
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_no")
    private int replyNo; //댓글  번호

    @Column(name = "reply_content")
    private String replyContent; //글 내용

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDate; // 작성일자

    @UpdateTimestamp
    private LocalDateTime updateDate; //수정일자

    //한개의 게시물은 여러개의 댓글을 가질 수 있음
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_no")
    private Board board;

    //한개의 게시물에 여러 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
