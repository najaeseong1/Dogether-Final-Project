package com.ictedu.dogether.adoptContract.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminListResponseDTO {

    List<RegistResponseDTO> dtoList;

    List<CombinedResponseDTO> DetailList;

}
