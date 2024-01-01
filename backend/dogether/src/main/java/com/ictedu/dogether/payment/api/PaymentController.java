package com.ictedu.dogether.payment.api;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.ownproduct.entity.Product;
import com.ictedu.dogether.ownproduct.service.productService;
import com.ictedu.dogether.payment.dto.PaymentRequest;
import com.ictedu.dogether.payment.dto.PaymentResponse;
import com.ictedu.dogether.payment.dto.ProductInfo;
import com.ictedu.dogether.payment.dto.UserPaymentResponse;
import com.ictedu.dogether.payment.entity.PaymentDetail;
import com.ictedu.dogether.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService; // 결제 서비스
    private final productService productservice; // 제품 서비스

    // Payment 유저 결제 내역 확인
    @GetMapping
    public ResponseEntity<?> getPaymentList(@AuthenticationPrincipal TokenUserInfo userInfo) {
        log.info("\n\n\n\n 전달된 토큰 확인해서 아이디 == {} 랑 role == {}을 뽑아 봅시다",userInfo.getUserId(),userInfo.getRole());
        try {
            UserPaymentResponse paymentList = paymentService.getPaymentList(userInfo);
            // 성공적인 경우
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // Payment 결제 승인
    @PostMapping
    public ResponseEntity<?> confirmPayment(@RequestHeader(value="Authorization") String SecretKey, @RequestBody PaymentRequest paymentRequest) {
        try {
            System.out.println("\n\n\n\n\n 컨트롤러에 POST 요청 들어옴 SecretKey = " + SecretKey);
            System.out.println("컨트롤러 페이먼트 리퀘스트" + paymentRequest);
            System.out.println("컨트롤러 겟 프로덕트 인포" + paymentRequest.getProductInfo());
            PaymentResponse response = paymentService.confirmPayment(paymentRequest, SecretKey);

            // 성공적인 경우
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}
