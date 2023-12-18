package com.ictedu.dogether.adoptApi.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptListResponseDTO {

    List<AdoptResponseDTO> adoptLists;
}
