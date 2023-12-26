package com.ictedu.dogether.ownproduct.dto.response;

import com.ictedu.dogether.ownproduct.entity.Product;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class productDetailResponseDTO {

    private int productId;

    private String title;

    private String subtitle;

    private String price;

    private String img;
    public productDetailResponseDTO(Product product) {
        this.productId = product.getProductId();
        this.title = product.getTitle();
        this.subtitle = product.getSubtitle();
        this.price = product.getPrice();
        this.img = product.getImg();
    }
}
