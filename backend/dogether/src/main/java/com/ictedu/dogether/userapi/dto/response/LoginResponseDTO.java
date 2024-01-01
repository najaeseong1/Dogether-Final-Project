package com.ictedu.dogether.userapi.dto.response;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {

    private String userId;
    private String userName;
    private String userEmail;

    private String token; // 인증 토큰
    private String role; // 권한



    public LoginResponseDTO(User user, String token) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.token = token;
        this.role = String.valueOf(user.getRole());
    }
}
