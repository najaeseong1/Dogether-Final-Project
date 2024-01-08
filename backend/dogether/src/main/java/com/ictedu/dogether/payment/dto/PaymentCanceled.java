package com.ictedu.dogether.payment.dto;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentCanceled {
    private String orderId;

    private String refusalReason;
}
