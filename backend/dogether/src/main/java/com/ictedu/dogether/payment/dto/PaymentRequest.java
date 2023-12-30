package com.ictedu.dogether.payment.dto;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.payment.dto.ProductInfo;
import com.ictedu.dogether.payment.entity.Payment;
import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    private String orderId;          // 주문 ID
    private String orderName;        // 주문 이름
    private String userId;           // 유저 아이디
    private List<ProductInfo> productInfo;      // 제품 정보
    private String amount;           // 지불 금액
    private String paymentKey;       // 주문 고유 키값


}
