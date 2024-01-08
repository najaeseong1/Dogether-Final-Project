package com.ictedu.dogether.adoptContract.dto.request;


import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptRegistDTO {

    private String desertionNo;

    private String userName;

    private int userAge;

    private boolean petStatus;

        private String job;

    private String userEmail;

    private String userPhone;

    private String postAddr;

    private String reason;



    public AdoptContract ToEntity(User user, Adopt adopt) {
        return AdoptContract.builder()
                .user(user)
                .adopt(adopt)
                .userName(this.userName)
                .userAge(this.userAge)
                .petStatus(this.petStatus)
                .job(this.job)
                .userEmail(this.userEmail)
                .userPhone(this.userPhone)
                .postAddr(this.postAddr)
                .reason(this.reason)
                .build();
    }
}
