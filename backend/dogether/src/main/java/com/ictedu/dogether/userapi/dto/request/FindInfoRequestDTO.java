package com.ictedu.dogether.userapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FindInfoRequestDTO {
    private String userId;
    private String userName;
    private String userEmail;
}