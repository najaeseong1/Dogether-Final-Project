package com.ictedu.dogether.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfo {
    private int productId;
    private String title;
    private String subtitle;
    private String price;
    private String img;
    private int totalPrice;
    private int totalCount;
}
