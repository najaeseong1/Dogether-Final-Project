package com.ictedu.dogether.userapi.dto.response;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSignUpResponseDTO {

    private String userId;

    private String userName;

    private String userEmail;

    private String userPass;

    private String userPhone;

    private int postNo;

    private String postAddr;

    private int score;





    public UserSignUpResponseDTO(User saved) {
        this.userId = saved.getUserId();
        this.userName = saved.getUserName();
        this.userEmail = saved.getUserEmail();
        this.userPass = saved.getUserPass();
        this.userPhone = saved.getUserPhone();
        this.postNo = saved.getPostNo();
        this.postAddr = saved.getPostAddr();
        this.score = saved.getScore();
    }
}
