package com.ictedu.dogether.payment.service;

import com.ictedu.dogether.ownproduct.dto.response.productDetailResponseDTO;
import com.ictedu.dogether.ownproduct.entity.Product;
import com.ictedu.dogether.ownproduct.service.productService;
import com.ictedu.dogether.payment.dto.PaymentRequest;
import com.ictedu.dogether.payment.dto.PaymentResponse;
import com.ictedu.dogether.payment.dto.ProductInfo;
import com.ictedu.dogether.payment.entity.CardInfo;
import com.ictedu.dogether.payment.entity.Payment;
import com.ictedu.dogether.payment.entity.PaymentDetail;
import com.ictedu.dogether.payment.repository.CardInfoEntityRepository;
import com.ictedu.dogether.payment.repository.PaymentDetailEntityRepository;
import com.ictedu.dogether.payment.repository.PaymentEntityRepository;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    @Autowired
    private PaymentEntityRepository paymentEntityRepository;
    @Autowired
    private CardInfoEntityRepository cardInfoEntityRepository;
    @Autowired
    private PaymentDetailEntityRepository paymentDetailEntityRepository;

    @Autowired
    private productService productService;

    @Autowired
    private final UserService userService;

    // 요청 응답을 위한 우리랑 안맞는 서비스
    public PaymentResponse confirmPayment(PaymentRequest paymentRequest, String paymentKey) {

        System.out.println("컨펌페이먼츠 서비스 요청"+ paymentRequest +"쁘라스"+ paymentKey);

        // userId로 User 정보 찾기
        UserSignUpResponseDTO userDTO = userService.getAdoptInfo(paymentRequest.getUserId());
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setUserName(userDTO.getUserName());
        user.setUserEmail(userDTO.getUserEmail());
        user.setUserPass(userDTO.getUserPass());
        user.setUserPhone(userDTO.getUserPhone());
        user.setPostNo(userDTO.getPostNo());
        user.setPostAddr(userDTO.getPostAddr());
        user.setScore(userDTO.getScore());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", paymentKey);

        HttpEntity<PaymentRequest> entity = new HttpEntity<>(paymentRequest, headers);
        ResponseEntity<PaymentResponse> response = new RestTemplate().exchange(
                "https://api.tosspayments.com/v1/payments/confirm",
                HttpMethod.POST,
                entity,
                PaymentResponse.class
        );
        System.out.println("\n\n PaymentService에서 토스 서버로 요청 후 받은 값"+response.getBody());

        // response를 CardInfo로 변환
        if(response.getBody().getCard() != null) {
            payToSaveCardInfo(response);
        }

        // response를 PaymentEntity로 변환
        Payment payment = Payment.builder()
                .paymentKey(response.getBody().getPaymentKey())
                .orderId(response.getBody().getOrderId())
                .orderName(response.getBody().getOrderName())
                .amount(response.getBody().getTotalAmount())
                .method(response.getBody().getMethod())
                .status(response.getBody().getStatus())
                .requestedAt(response.getBody().getRequestedAt())
                .approvedAt(response.getBody().getApprovedAt())
                .user(user) // User 정보 설정
                .build();

        CardInfo cardInfo = null;
        if(response.getBody().getCard() != null) {
            cardInfo = payToSaveCardInfo(response);
        }
        payment.setCard(cardInfo); // 카드 정보 설정
        log.info("\n\n\n 그 위에 서비스에서 페이먼트에 저장하기 위해 넣어놓은거 {}", payment);

        // 데이터베이스에 저장
        Payment savedPayment = paymentEntityRepository.save(payment); // 먼저 Payment를 저장
        savePaymentDetails(paymentRequest, savedPayment);    // Payment_detail 저장
        


        return response.getBody();
    }

    private CardInfo payToSaveCardInfo(ResponseEntity<PaymentResponse> response) {
        CardInfo card = CardInfo.builder()
                .cardRegNo(response.getBody().getCard().getCardRegNo())
                .issuerCode(response.getBody().getCard().getIssuerCode())
                .acquirerCode(response.getBody().getCard().getAcquirerCode())
                .cardNumber(response.getBody().getCard().getCardNumber())
                .ownerType(response.getBody().getCard().getOwnerType())
                .installmentPlanMonths(response.getBody().getCard().getInstallmentPlanMonths())
                .isInterestFree(response.getBody().getCard().getIsInterestFree())
                .approveNo(response.getBody().getCard().getApproveNo())
                .acquireStatus(response.getBody().getCard().getAcquireStatus())
                .build();
        // 데이터베이스 카드 정보 저장
        return cardInfoEntityRepository.save(card);
    }


    // 전달받은 productInfo를 PaymentDetail에 저장할 서비스
    public void  savePaymentDetails(PaymentRequest paymentRequest, Payment payment) {
        List<ProductInfo> productInfos = paymentRequest.getProductInfo();
        List<PaymentDetail> paymentDetails = new ArrayList<>();
        PaymentDetail paymentDetail = new PaymentDetail();

        int totalCount = 0;
        int totalPrice = 0;
        for (ProductInfo productInfo : productInfos) {
            totalCount += productInfo.getTotalCount();
            totalPrice += productInfo.getTotalPrice();
            paymentDetail.setOrderId(payment); // 주문 ID를 설정
            paymentDetail.setTotalCount(totalCount);
            paymentDetail.setTotalPrice(totalPrice);
            if(paymentDetail.getProducts() == null) {
                paymentDetail.setProducts(productService.getDetailProduct(productInfo.getProductId()).toProduct());
            }
        }
        paymentDetails.add(paymentDetailEntityRepository.save(paymentDetail));
    }
}
