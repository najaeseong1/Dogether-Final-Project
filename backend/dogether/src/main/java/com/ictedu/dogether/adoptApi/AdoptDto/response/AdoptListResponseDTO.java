package com.ictedu.dogether.adoptApi.AdoptDto.response;

import com.ictedu.dogether.adoptContract.dto.response.RegistResponseDTO;
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
