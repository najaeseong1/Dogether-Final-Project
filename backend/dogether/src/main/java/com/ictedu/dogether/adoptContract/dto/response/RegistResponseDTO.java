package com.ictedu.dogether.adoptContract.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  RegistResponseDTO {


    private AdoptionStatus adoptionStatus;

    private String reasonsRefusal;

    private String userId;

    private String userName;

    private int userAge;

    private boolean petStatus;

    private String job;

    private String userEmail;

    private String userPhone;

    private String postAddr;

    private String reason;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    private String desertionNo;

    public RegistResponseDTO(AdoptContract info) {
        this.adoptionStatus = info.getAdoptionStatus();
        this.reasonsRefusal = info.getReasonsRefusal();
        this.userId = info.getUser().getUserId();
        this.desertionNo = info.getAdopt().getDesertionNo();
        this.userName = info.getUserName();
        this.userAge = info.getUserAge();
        this.petStatus = info.isPetStatus();
        this.job = info.getJob();
        this.userEmail = info.getUserEmail();
        this.userPhone = info.getUserPhone();
        this.postAddr = info.getPostAddr();
        this.reason = info.getReason();
        this.createDate = info.getCreateDate();
    }



}
