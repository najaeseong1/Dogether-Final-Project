package com.ictedu.dogether.payment.service;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.ownproduct.repository.ownProductRepository;
import com.ictedu.dogether.ownproduct.service.productService;
import com.ictedu.dogether.payment.dto.*;
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
import java.util.List;

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
    private ownProductRepository ownProductRepository;

    @Autowired
    private productService productService;

    @Autowired
    private final UserService userService;

    // 결제 요청 서비스
    public PaymentResponse confirmPayment(PaymentRequest paymentRequest, String paymentKey, String userInfo) {

        System.out.println("confirmPayment 서비스 요청"+ paymentRequest +"쁘라스"+ paymentKey);

        // userId로 User 정보 찾기
        UserSignUpResponseDTO userDTO = userService.getAdoptInfo(userInfo);
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
        System.out.println("\n\n PaymentService 토스 서버로 요청 후 받은 값"+response.getBody());

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
            cardInfo = payToSaveCardInfo(response, user);
        }
        payment.setCard(cardInfo); // 카드 정보 설정
        log.info("\n\n\n 그 위에 서비스 payment 에 저장 하기 위해 넣어 놓은거 {}", payment);

        // 데이터베이스에 저장
        Payment savedPayment = paymentEntityRepository.save(payment); // 먼저 Payment를 저장
        savePaymentDetails(paymentRequest, savedPayment);    // Payment_detail 저장
        


        return response.getBody();
    }

    // 사용한 카드 데이터베이스에 등록하는 메서드
    private CardInfo payToSaveCardInfo(ResponseEntity<PaymentResponse> response, User user ) {
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
        card.setUser(user);
        // 데이터베이스 카드 정보 저장
        return cardInfoEntityRepository.save(card);
    }


    // 전달받은 productInfo를 PaymentDetail에 저장할 서비스
    public void  savePaymentDetails(PaymentRequest paymentRequest, Payment payment) {
        List<ProductInfo> productInfos = paymentRequest.getProductInfo();
        log.info("\n\n\n\n\n\n savePaymentDetails 에서 전달 받은 productInfo's {} ",productInfos);
        List<PaymentDetail> paymentDetails = new ArrayList<>();

        for (ProductInfo productInfo : productInfos) {
            PaymentDetail paymentDetail = new PaymentDetail();
            paymentDetail.setOrderId(payment); // 주문 ID를 설정
            paymentDetail.setTotalCount(productInfo.getTotalCount());
            paymentDetail.setTotalPrice(productInfo.getTotalPrice());
            paymentDetail.setProducts(productService.getDetailProduct(productInfo.getProductId()).toProduct());
            log.info("\n\n\n저장하기 직전에 뭐가 저장되는지 한번 봅시다 {}",paymentDetail);
            paymentDetailEntityRepository.save(paymentDetail);
        }
    }

    // 토큰을 통해서 결제내역 목록 리스트를 반환하는 서비스
    public UserPaymentResponse getPaymentList(TokenUserInfo userInfo) {
        log.info("\n\n\n 서비스 getPaymentList 요청 들어옴");
        UserPaymentResponse response = new UserPaymentResponse();

        // 페이먼츠 테이블에서 userId가 같은 orderId 검색
        List<Payment> payments = paymentEntityRepository.findByUser_UserId(userInfo.getUserId());
        List<ProductInfo> productInfos = new ArrayList<>(); // 조회한 ProducInfo 를 쌓아둘 리스트 생성
        List<PaymentResponse> paymentResponseList = new ArrayList<>(); // 조회한 PaymentResponse 를  쌓아둘 리스트 생성

        for (Payment payment : payments) {
            PaymentResponse paymentResponse = new PaymentResponse(payment);

            // 페이먼츠 디테일 테이블에서 order_id가 같은 product_id 검색
            List<PaymentDetail> paymentDetails = paymentDetailEntityRepository.findByOrderId(payment);
            log.info("\n\n\n\n List<PaymentDetail> paymentDetails   {}", paymentDetails);
            for (PaymentDetail paymentDetail : paymentDetails) {
                // 프로덕트 테이블에서 product_id가 같은 제품들 검색하고 제품 정보를 ProductInfo로
                ProductInfo productInfo = new ProductInfo();
                productInfo.setProductId(paymentDetail.getProducts().getProductId());
                productInfo.setTitle(paymentDetail.getProducts().getTitle());
                productInfo.setSubtitle(paymentDetail.getProducts().getSubtitle());
                productInfo.setPrice(paymentDetail.getProducts().getPrice());
                productInfo.setImg(paymentDetail.getProducts().getImg());
                productInfo.setTotalCount(paymentDetail.getTotalCount());
                productInfo.setTotalPrice(paymentDetail.getTotalPrice());
                productInfo.setOrderId(paymentDetail.getOrderId().getOrderId());
                productInfos.add(productInfo);
            }
            paymentResponseList.add(paymentResponse);
        }
        response.setPaymentResponse(paymentResponseList);
        response.setProductInfos(productInfos);
        log.info("\n\n\n\n 서비스에서 응답 직전 response   {}", response);
        return response;
    }


    //주문번호로 결제내역 찾기 서비스
    private Payment bringPayment(String orderId) {
        return paymentEntityRepository.findByOrderId(orderId);
    }

    // 결제내역 삭제
    public void deletePayment(String orderId, TokenUserInfo userId) {

        log.info("\n\n\n삭제 -{}", userId);
        log.info("\n\n\n삭제 -{}", userId.getUserId());

//        //삭제하려는 해당 댓글 정보
//        Reply reply = bringWriter(replyNo);
        Payment payment = bringPayment(orderId);
        log.info("userInfo아이디", userId.getUserId());
        if(!userId.getUserId().equals(payment.getUser().getUserId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        paymentEntityRepository.deleteById(orderId);
    }

}
