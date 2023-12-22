package com.ictedu.dogether.Adimin.api;


import com.ictedu.dogether.adoptContract.dto.response.ApproveListResponseDTO;
import com.ictedu.dogether.adoptContract.service.ContractService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {


    private final ContractService contractService;

    //입양 접수된 목록 불러오기
    @GetMapping("/adminpending")
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
    @GetMapping("/adminApprovedList")
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
    @GetMapping("/adminRejected")
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




}
