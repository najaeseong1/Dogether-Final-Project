package com.ictedu.dogether.adoptContract.dto.response;


import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptionFormDTO {

    private String userName;

    private String userEmail;

    private String userPhone;

    private String postAddr;


    private String desertionNo;

    private String careNm;

    private String age;

    private String gender;

    private String kindCd;

    private String weight;

    private String happenAddr;

    private String specialMark;

    private String neuterYn;

    private String reasonRefusal;

    private String colorCd;
    public AdoptionFormDTO(UserSignUpResponseDTO userInfo, AdoptResponseDTO adoptInfo) {
        this.userName = userInfo.getUserName();
        this.userEmail = userInfo.getUserEmail();
        this.userPhone = userInfo.getUserPhone();
        this.postAddr = userInfo.getPostAddr();
        this.careNm = adoptInfo.getCareNm();
        this.age = adoptInfo.getAge();
        this.gender = adoptInfo.getGender();
        this.kindCd = adoptInfo.getKindCd();
        this.happenAddr = adoptInfo.getHappenAddr();
        this.specialMark = adoptInfo.getSpecialMark();
        this.neuterYn = adoptInfo.getNeuterYn();
    }




}
