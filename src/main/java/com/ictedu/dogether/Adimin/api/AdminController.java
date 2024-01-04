package com.ictedu.dogether.Adimin.api;


import com.ictedu.dogether.adoptContract.dto.response.ApproveListResponseDTO;
import com.ictedu.dogether.adoptContract.service.ContractService;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.payment.dto.PaymentResponse;
import com.ictedu.dogether.payment.dto.UserPaymentResponse;
import com.ictedu.dogether.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {


    private final ContractService contractService;

    private final PaymentService paymentService;

    //입양 접수된 목록 불러오기
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> pendingList() {
        try {
            List<ApproveListResponseDTO> pendingList = contractService.getPendingList();
            return ResponseEntity.ok().body(pendingList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }



    //입양 승인된 목록 불러오기
    @GetMapping("/approvedlist")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approvedList() {

        try {
            List<ApproveListResponseDTO> approveList = contractService.getApproveList();
            return ResponseEntity.ok().body(approveList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //입양 거절된 목록 불러오기
    @GetMapping("/rejected")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectedList() {
        try {
            List<ApproveListResponseDTO> rejectedList = contractService.getRejectedList();
            return ResponseEntity.ok().body(rejectedList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> paymentList() {
        try {
            UserPaymentResponse paymentList = paymentService.getPaymentListAll();
            // 성공적인 경우
            return ResponseEntity.ok().body(paymentList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    //관리자 페이지 결제 status === READY 목록 불러오기
    @GetMapping("/processList")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> processList() {
        try {
            List<PaymentResponse> paymentReadyList = paymentService.getPaymentReadyList();
            return ResponseEntity.ok().body(paymentReadyList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //관리자 페이지 결제 status === CANCELED 목록 불러오기
    @GetMapping("/cancelList")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cancelList() {
        try {
            List<PaymentResponse> paymentReadyList = paymentService.getPaymentCanceledList();
            return ResponseEntity.ok().body(paymentReadyList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }




}
