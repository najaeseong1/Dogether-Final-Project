package com.ictedu.dogether.Adimin.api;

import com.ictedu.dogether.Adimin.dto.request.statusRegistRequestDTO;
import com.ictedu.dogether.Adimin.dto.response.statusRegistResponseDTO;

import com.ictedu.dogether.Adimin.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {


//    private final AdminService adminService;
//
//    //입양 신청 버튼을 누른 그 상태를 admin 에다 저장 해야 한다.
//    @PostMapping("/statusRegist")
//    @PreAuthorize("hasRole('ADMIN')") //admin일때  이 메서드 실행됨
//    public ResponseEntity<?> statusRegist(@RequestBody statusRegistRequestDTO dto) {
//
//
//        try {
//            statusRegistResponseDTO statusRegistResponseDTO = adminService.statusRegist(dto);
//            return ResponseEntity.ok().body(statusRegistResponseDTO);
//        } catch (Exception e) {
//
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//
//    }
//    //입양 승인 거절 목록 요청
//    @GetMapping("/statusList/{adminId}")
//    public ResponseEntity<?> statusList(@PathVariable String adminId) {
//        adminService.statusList(adminId);
//
//        return null;
//    }


}
