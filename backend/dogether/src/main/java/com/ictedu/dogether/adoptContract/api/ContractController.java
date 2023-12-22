package com.ictedu.dogether.adoptContract.api;


import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptApi.service.ApiService;
import com.ictedu.dogether.adoptContract.dto.request.AdoptRegistDTO;
import com.ictedu.dogether.adoptContract.dto.request.RejectedRequestDTO;
import com.ictedu.dogether.adoptContract.dto.response.AdminListResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.RegistResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.AdoptionFormDTO;
import com.ictedu.dogether.adoptContract.dto.response.myPageApprovedDTO;
import com.ictedu.dogether.adoptContract.service.ContractService;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/contract")
@CrossOrigin

//입양 신청서 컨트롤러
public class ContractController {

    private final ContractService contractService;
    private final UserService userService;
    private final ApiService apiService;

    //입양신청서 버튼 누르면 입양신청서 기본 정보를 끌고 와야함
    //그럼 아이디랑 분양 게시물 아이디를 줘야 겠네..?
    @GetMapping("/{userId}/{desertionNo}")
    public ResponseEntity<?> adoptionForm(@PathVariable("userId") String userId,
                                          @PathVariable("desertionNo") String desertionNo
                                         ) {
        try {
            UserSignUpResponseDTO adoptInfo = userService.getAdoptInfo(userId);
            AdoptResponseDTO AdoptDetailPage = apiService.getDetailPage(desertionNo);
            AdoptionFormDTO adoptionForm = new AdoptionFormDTO(adoptInfo,AdoptDetailPage);

            return ResponseEntity.ok().body(adoptionForm);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    //입양 신청서 등록 하기~
    @PostMapping("/regist")
    public ResponseEntity<?> adoptRegist(@RequestBody AdoptRegistDTO dto,
                                         @AuthenticationPrincipal TokenUserInfo userInfo
                                         ) {
        log.info("입양신청서 등록하기 컨트롤러 요청 ~ -{}", dto);
        try {
            RegistResponseDTO registResponseDTO = contractService.adoptRegist(dto, userInfo);
            return ResponseEntity.ok().body(registResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //관리자 입양 신청서 페이지 상세 조회
    @PostMapping("/admindetail/{desertionNo}")
    @PreAuthorize("hasRole('ADMIN')") //admin일때  이 메서드 실행됨
    public ResponseEntity<?> getListDetail(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @PathVariable String desertionNo
    ) {
        try {
            AdminListResponseDTO listDetail = contractService.getListDetail(desertionNo, userInfo);
            return ResponseEntity.ok().body(listDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

        //입양 신청 승인 로직
        @PostMapping("/adminapproved/{contractNo}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<?> adminApproved(
                @AuthenticationPrincipal TokenUserInfo userInfo,
                @PathVariable int contractNo) {

                contractService.approvedRegist(userInfo, contractNo);
        return ResponseEntity.ok().build();

        }

        //입양 신청 거절 로직
        @PostMapping("/adminrejected")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<?> adminRejected(@RequestBody RejectedRequestDTO dto,
                                               @AuthenticationPrincipal TokenUserInfo userInfo
                    ) {

                contractService.rejected(dto, userInfo);
            return ResponseEntity.ok().build();

        }



    //마이페이지 입양신청 목록
    @GetMapping("/mypageadoptionlist")
    public  ResponseEntity<?> getAdminList(@AuthenticationPrincipal TokenUserInfo userInfo) {
        log.info("입양신청 관리자 페이지 요청 들어옴");
        //입양 신청서 id를 줌
        AdminListResponseDTO adminList = contractService.getAdminList(userInfo);

        return ResponseEntity.ok().body(adminList);
    }

    //마이페이지 입양 신청 승인 |거절 쪽 상세 보기
    @GetMapping("/mypageadoptiondetail")
    public ResponseEntity<?> getAdoptionList(@AuthenticationPrincipal TokenUserInfo userInfo,
                                            @RequestParam int contractNo) {
        log.info("contractNo -{}", contractNo);
        try {
            myPageApprovedDTO myPageDetail = contractService.getMyPageDetail(userInfo, contractNo);
            return ResponseEntity.ok().body(myPageDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }






    //마이페이지 입양 신청서 상세보기 ->이거 관리자 페이지 토대로 해야함







}
