package com.ictedu.dogether.adoptApi.Entity;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_no")
    private int wishNo; // 좋아요 번호

    //한개의 게시물은 여러개의 좋아요를 가질 수 있다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "desertion_no")
    private Adopt adopt;


    //한명의 유저는 여러개의 좋아요를 가질 수 있다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =  "user_id" )
    private User user;



}
