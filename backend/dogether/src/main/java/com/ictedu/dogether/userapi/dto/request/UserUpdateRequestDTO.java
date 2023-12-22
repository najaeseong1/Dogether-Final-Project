package com.ictedu.dogether.userapi.dto.request;
import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequestDTO {




    @NotBlank
    @Size(min = 8, max = 20)
    private String userPass;

    @NotBlank
    private String userPhone;

    @NotBlank
    private String postAddr;



    // DTO를 Entity로 변경하는 메서드
    // 회원 정보 수정 시 일부 정보만을 업데이트하고자 할 경우 이 메서드를 사용
    public User toEntity() {
        return User.builder()
                .userPass(this.userPass)
                .userPhone(this.userPhone)
                .postAddr(this.postAddr)
                .build();
    }
}