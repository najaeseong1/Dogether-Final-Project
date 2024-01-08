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

    // productId를 통해서 제품 정보 찾으려고 추가
    public Product toProduct() {
        Product product = new Product();
        product.setProductId(this.productId);
        product.setTitle(this.title);
        product.setSubtitle(this.subtitle);
        product.setPrice(this.price);
        product.setImg(this.img);
        return product;
    }
}
