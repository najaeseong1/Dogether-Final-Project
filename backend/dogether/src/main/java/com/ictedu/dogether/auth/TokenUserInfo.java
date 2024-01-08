package com.ictedu.dogether.auth;

import com.ictedu.dogether.userapi.entity.Role;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenUserInfo {

    private String userId;
    private Role role;

}
