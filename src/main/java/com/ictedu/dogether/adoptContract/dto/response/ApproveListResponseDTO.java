package com.ictedu.dogether.adoptContract.dto.response;


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
public class ApproveListResponseDTO {

    private String desertionNo;

    private int contractNo;

    private String userName;

    private int userAge;

    private boolean petStatus;

    private String job;

    private String userEmail;

    private String userPhone;

    private String postAddr;

    private String reason;

    private String reasonsRefusal;

    private AdoptionStatus adoptionStatus;

    private LocalDateTime createDate;

    public ApproveListResponseDTO(AdoptContract ac) {
        this.desertionNo = ac.getAdopt().getDesertionNo();
        this.contractNo = ac.getContractNo();
        this.userName = ac.getUserName();
        this.userAge =ac.getUserAge();
        this.petStatus = ac.isPetStatus();
        this.job = ac.getJob();
        this.userEmail = ac.getUserEmail();
        this.userPhone = ac.getUserPhone();
        this.postAddr = ac.getPostAddr();
        this.reason = ac.getReason();
        this.reasonsRefusal = ac.getReasonsRefusal();
        this.adoptionStatus =ac.getAdoptionStatus();
        this.createDate = ac.getCreateDate();
    }



}
