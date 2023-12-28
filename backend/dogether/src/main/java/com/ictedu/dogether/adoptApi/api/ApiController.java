package com.ictedu.dogether.adoptApi.api;

import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptListResponseDTO;
import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptApi.WishDto.response.WishRegisterResponseDTO;
import com.ictedu.dogether.adoptApi.service.ApiService;
import com.ictedu.dogether.auth.TokenUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/adopt")
@CrossOrigin
public class ApiController {

    private  final ApiService apiService;

    //api 통한 강아지 데이터베이스에 저장하기
    @GetMapping
    public ResponseEntity<?> getAdoptList() {
        try {
            AdoptListResponseDTO adoptList = apiService.getAdoptList();
            return ResponseEntity.ok().body(adoptList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    //데이터베이스를 통한 강아지 목록 불러오기
//    @GetMapping()


    //시도코드 통한 강아지 목록 불러오기
    @GetMapping("/adminicode")
    public ResponseEntity<?> getAdmincodeList(@RequestParam String uprCd) {
        try {
            AdoptListResponseDTO adminCodeList = apiService.getAdminCodeList(uprCd);
            return ResponseEntity.ok().body(adminCodeList);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }



    //분양게시글 상세보기 요청
    @GetMapping("/detail/{desertionNo}")
    public ResponseEntity<?> detailPage(@PathVariable("desertionNo") String desertionNo) {
        try {
            AdoptResponseDTO detailPage = apiService.getDetailPage(desertionNo);
            return ResponseEntity.ok().body(detailPage);
        } catch (Exception e) {
            e.printStackTrace();
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //좋아요 등록
        @GetMapping("/wishregist/{desertionNo}")
        public ResponseEntity<?> wishRegist(@PathVariable("desertionNo") String desertionNo,
                                            @AuthenticationPrincipal TokenUserInfo userInfo
                                        ) {
        try {
            WishRegisterResponseDTO wishRegisterResponseDTO = apiService.registWith(desertionNo, userInfo);
            return ResponseEntity.ok().body(wishRegisterResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //좋아요 등록 취소
    @DeleteMapping("/wish/{wishno}")
    public ResponseEntity<?> wishDelete(@PathVariable("wishno") int wishno,
                                        @AuthenticationPrincipal TokenUserInfo userInfo
                                        ) {
        apiService.deleteWish(wishno, userInfo);

        return ResponseEntity.ok().build();

    }

    //좋아요 등록한 그 게시물 목록 불러오기
    @GetMapping("/wishlist/{userId}")
    public ResponseEntity<?> wishList(@PathVariable("userId") String userId) {
        log.info("좋아요 목록 들어옴");
        try {
            AdoptListResponseDTO adoptListResponseDTO = apiService.wishList(userId);
            return ResponseEntity.ok().body(adoptListResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}



