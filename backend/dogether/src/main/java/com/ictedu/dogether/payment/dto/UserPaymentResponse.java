package com.ictedu.dogether.payment.dto;

import com.ictedu.dogether.payment.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPaymentResponse {
    private PaymentResponse paymentResponse;
    private List<ProductInfo> productInfos;
}
