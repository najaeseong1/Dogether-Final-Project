package com.ictedu.dogether.adoptContract.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RejectedRequestDTO {

        private int contractNo;

    private String refusalReason;
}
