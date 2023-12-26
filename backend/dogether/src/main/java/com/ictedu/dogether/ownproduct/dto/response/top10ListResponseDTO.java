package com.ictedu.dogether.ownproduct.dto.response;

import com.ictedu.dogether.ownproduct.entity.Product;
import lombok.*;

import javax.persistence.Column;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class top10ListResponseDTO {



    private int productId;

    private String title;

    private String subtitle;

    private String price;

    private String img;

    public top10ListResponseDTO(Product product) {
        this.productId = product.getProductId();
        this.subtitle = product.getSubtitle();
        this.price = product.getPrice();
        this.title =product.getTitle();
        this.img = product.getImg();


    }
}
