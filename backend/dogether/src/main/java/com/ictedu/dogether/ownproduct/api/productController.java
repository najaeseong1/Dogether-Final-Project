package com.ictedu.dogether.ownproduct.api;


import com.ictedu.dogether.ownproduct.dto.response.productDetailResponseDTO;
import com.ictedu.dogether.ownproduct.dto.response.top10ListResponseDTO;
import com.ictedu.dogether.ownproduct.service.productService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/product")
@CrossOrigin
public class productController {

    private final productService productservice;


    //상품 가져오기
    @GetMapping
    public ResponseEntity<?> bringProduct() {
        try {
            List<top10ListResponseDTO> productList = productservice.getProductList();
            return ResponseEntity.ok().body(productList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //상품 상세보기
    @GetMapping("/detail/{productId}")
    public ResponseEntity<?> detailProduct(@PathVariable int productId) {
        try {
            productDetailResponseDTO detailProduct = productservice.getDetailProduct(productId);
            return ResponseEntity.ok().body(detailProduct);
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }






}
