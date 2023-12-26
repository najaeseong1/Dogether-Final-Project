package com.ictedu.dogether.ownproduct.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Entity

@Table(name = "dogetherproduct")
public class Product {

    @Id
    @Column(name = "product_id")
    private int productId;


    private String title;

    private String subtitle;

    private String price;

    private String img;

}
