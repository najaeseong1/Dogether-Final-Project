package com.ictedu.dogether.payment.dto;

import com.ictedu.dogether.payment.entity.Payment;
import lombok.*;
import java.time.LocalDateTime;

import java.util.UUID;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    private String orderId;          // 주문 ID
    private String orderName;        // 상품 이름
    private String userId;          // 고객 아이디
    private String amount;           // 지불 금액
    private String paymentKey;       // 지불 방법

    public Payment toEntity() {
        return Payment.builder()
                .orderId(orderId)
                .orderName(orderName)
                .userId(userId)
                .amount(amount)
                .paymentKey(paymentKey)
                .build();
    }
}
