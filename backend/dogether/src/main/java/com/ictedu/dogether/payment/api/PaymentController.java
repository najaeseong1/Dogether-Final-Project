package com.ictedu.dogether.payment.api;

import com.ictedu.dogether.payment.dto.PaymentRequest;
import com.ictedu.dogether.payment.dto.PaymentResponse;
import com.ictedu.dogether.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService; // 서비스 레이어 클래스를 주입받습니다.

    // Payment 결제 승인
    @PostMapping
    public ResponseEntity<?> confirmPayment(@RequestHeader(value="Authorization") String SecretKey, @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.confirmPayment(request, SecretKey);
        return ResponseEntity.ok(response);
    }
}
