package com.ictedu.dogether.payment.entity;

import com.ictedu.dogether.payment.dto.CardInfo;
import com.ictedu.dogether.payment.dto.PaymentResponse;
import com.ictedu.dogether.userapi.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment")
public class Payment {
    @Id
    @Setter
    @Column(name = "order_id", nullable = false, unique = true)
    private String orderId;                 // 주문 고유 번호

    @Column(name = "order_name", nullable = false)
    private String orderName;               // 상품 명

    @Column(name = "amount", nullable = false)
    private String amount;                    // 주문 가격

    @Column(name = "payment_key",nullable = false)
    private String paymentKey;			// 결제 고유 번호

    @Column(name = "method",nullable = false)
    private String method;          // 지불 수단

    @Column(name = "status",nullable = false)
    private String status;          // 결제 상태

    @Setter
    @Column(updatable = false)
    private String requestedAt;              // 요청시간

    @Setter
    @Column(updatable = false)
    private String approvedAt;              // 요청시간


    @Setter
    @Column(nullable = false)
    @ColumnDefault("결제성공")
    private String paySuccessYn;			// 결제 성공 여부

    @Setter
    @Column
    private String payFailReason;			// 결제 실패 이유, response.getBody()

    @Setter
    @Column(nullable = false)
    @ColumnDefault("false")
    private String cancelYn;				// 결제 취소 여부

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private User customer;                  // 유저 정보


}