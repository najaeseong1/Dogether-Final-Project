package com.ictedu.dogether.ownproduct.service;

import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import com.ictedu.dogether.adoptContract.dto.response.AdminListResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.ApproveListResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.RegistResponseDTO;
import com.ictedu.dogether.ownproduct.dto.response.productDetailResponseDTO;
import com.ictedu.dogether.ownproduct.dto.response.top10ListResponseDTO;
import com.ictedu.dogether.ownproduct.entity.Product;
import com.ictedu.dogether.ownproduct.repository.ownProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class productService {

    private final ownProductRepository ownProductRepository;

    //상품가져오기
    public  List<top10ListResponseDTO> getProductList() {

        return ownProductRepository.findTop10ByOrderByProductId()
                .stream().map(top10ListResponseDTO::new)
                .collect(Collectors.toList());



    }

    public productDetailResponseDTO getDetailProduct(int productId) {
        Product product = ownProductRepository.findById(productId).orElseThrow(
                () -> new RuntimeException("상품 정보가 없습니다.")
        );
        return new productDetailResponseDTO(product);
    }
}
