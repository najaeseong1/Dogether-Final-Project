package com.ictedu.dogether.userapi.dto.request;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestSignUpDTO {


    @NotBlank // 아이디 유효성검사 시 size 설정예정
    private String userId;

    @NotBlank
    @Size(min = 2, max = 6)
    private String userName;

    @NotBlank
    @Size(min = 8, max = 20)
    private String userPass;

    @NotBlank
    private String userPhone;

    @NotBlank
    @Email
    private String userEmail;

    @NotBlank
    @Size(min = 5, max = 5)
    private int postNo;

    @NotBlank
    private String postAddr;

    private int score;

    // dto를 Entity로 변경하는 메서드
    public User toEntity() {
        return User.builder()
                .userId(this.userId)
                .userName(this.userName)
                .userPass(this.userPass)
                .userPhone(this.userPhone)
                .userEmail(this.userEmail)
                .postNo(this.postNo)
                .postAddr(this.postAddr)
                .score(this.score)
                .build();
    }

}
