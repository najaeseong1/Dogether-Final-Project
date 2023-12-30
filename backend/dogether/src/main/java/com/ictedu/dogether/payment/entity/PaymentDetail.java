package com.ictedu.dogether.payment.entity;

import com.ictedu.dogether.ownproduct.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment_detail")
public class PaymentDetail {
    // 주문 명세서 " 주문번호 , 제품 번호 ,  "
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_detail_id")
    private int paymentDetailId;            // 제품상세서 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =  "order_id" )
    private Payment orderId;    // 주문 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product products;    // 제품 번호

    @Column(name="total_count")
    private int totalCount;    // 주문 총 수

    @Column(name="total_price")
    private int totalPrice;    // 주문 총합 값

}