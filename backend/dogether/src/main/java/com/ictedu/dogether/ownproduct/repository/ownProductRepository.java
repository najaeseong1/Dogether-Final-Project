package com.ictedu.dogether.ownproduct.repository;

import com.ictedu.dogether.ownproduct.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ownProductRepository extends JpaRepository<Product, Integer> {


    // productId를 기준으로 정렬하여 상위 10개의 상품을 가져오는 메서드
    List<Product> findTop10ByOrderByProductId();

}
