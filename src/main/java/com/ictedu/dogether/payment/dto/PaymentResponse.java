package com.ictedu.dogether.payment.dto;

import com.ictedu.dogether.payment.entity.CardInfo;
import com.ictedu.dogether.payment.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private String paymentKey;		// 클라이언트에서 서버로 전달했던 키 값

    @JsonProperty("orderId")
    private String orderId;			// 주문 고유 ID

    @JsonProperty("orderName")
    private String orderName;		// 주문 상품 이름

    @JsonProperty("totalAmount")
    private String totalAmount;		// 지불금액

    @JsonProperty("method")
    private String method;          // 지불 수단

    @JsonProperty("status")
    private PaymentStatus status;          // 결제 상태

    @JsonProperty("card")
    private CardInfo card;          // 카드 정보

    @JsonProperty("requestedAt")
    private String requestedAt;		// 결제 응답 날짜

    @JsonProperty("approvedAt")
    private String approvedAt;		// 결제 응답 날짜

    public PaymentResponse(Payment payment) {
        this.paymentKey = payment.getPaymentKey();
        this.orderId = payment.getOrderId();
        this.orderName = payment.getOrderName();
        this.totalAmount = payment.getAmount();
        this.method = payment.getMethod();
        this.status = payment.getStatus();
        this.requestedAt = payment.getRequestedAt();
        this.approvedAt = payment.getApprovedAt();
    }
}