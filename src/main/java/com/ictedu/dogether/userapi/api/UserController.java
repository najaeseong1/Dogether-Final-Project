package com.ictedu.dogether.userapi.api;

import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.dto.request.*;
import com.ictedu.dogether.userapi.dto.response.EmailResponseDTO;
import com.ictedu.dogether.userapi.dto.response.LoginResponseDTO;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.service.MailSendService;
import com.ictedu.dogether.userapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final MailSendService mailSendService;

    // 아이디 중복 체크
    @GetMapping("/checkid")
    public ResponseEntity<?> check(String userId) {
        if(userId.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("아이디가 없습니다!");
        }

        boolean resultFlag = userService.isDuplicate(userId);
        log.info("아이디 - {}", userId, resultFlag);

        return ResponseEntity.ok().body(resultFlag);
    }


    // 회원 가입 요청 처리
    // POST: /user/join
    @PostMapping("/join")
    private ResponseEntity<?> create(@RequestBody UserRequestSignUpDTO dto, BindingResult result) {
        {
            log.info("/user/join POST! - {}", dto);


            if (result.hasErrors()) {
                log.warn(result.toString());
                return ResponseEntity.badRequest()
                        .body(result.getFieldError());
            }

            try {
                UserSignUpResponseDTO responseDTO = userService.create(dto);
                return ResponseEntity.ok()
                        .body(responseDTO);
            } catch (RuntimeException e) {
                log.warn("아이디 중복!");
                return ResponseEntity.badRequest().body(e.getMessage());
            } catch (Exception e) {
                log.warn("기타 예외가 발생했습니다!");
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }

        }

    }


    // 로그인 요청
    @PostMapping("/login")
    public ResponseEntity<?> signIn(
            @Validated @RequestBody LoginRequestDTO dto,
            BindingResult result
    ) {

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }

        log.info("로그인요청!");
        try {
            LoginResponseDTO responseDTO
                    = userService.authenticate(dto);

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // 아이디와 인증코드를 리턴
    @PostMapping("/findid")
    public ResponseEntity<?> findUserId(@RequestBody EmailRequestDTO dto) {
        log.info("아이디찾기 요청들어옴!!");
        log.info("이메일 -{}", dto);
        try {
            String code = mailSendService.checkEmail(dto.getEmail());
            String userId = userService.getUserId(dto);

            EmailResponseDTO emailResponseDTO = new EmailResponseDTO(code, userId);
            return ResponseEntity.ok().body(emailResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 비밀번호 변경
    @PostMapping("/modifypass")
    public ResponseEntity<?> modifyPass(@RequestBody LoginRequestDTO dto) { // dto 재활용
        log.info("비밀번호 변경요청!");

        try {
            userService.getUserPass(dto);

            return ResponseEntity.ok().build(); // 200 상태값이 뜸
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }

    //개인정보 변경 페이지에 사용자 데이터 끌고오기 (비번 변경, 전화번호, 주소, 결제수단 ->  변경가능)
    @GetMapping("/modify")
    public ResponseEntity<?> modifyPage( @AuthenticationPrincipal TokenUserInfo userInfo) {
        log.info("개인정보 변경 페이지 요청 들어옴 ");


        try {
            UserSignUpResponseDTO targetUser = userService.getUserInfo(userInfo);
            return ResponseEntity.ok().body(targetUser);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }


    //개인정보 변경 수정 요청 들어옴
    @PostMapping("/modify")
    public ResponseEntity<?> updateUserInfo(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            UserUpdateRequestDTO dto,
            BindingResult result) {

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }

        log.info("개인정보 변경 수정 요청 들어옴 -{}", dto);
        try {
            //dto 재활용
            UserSignUpResponseDTO updateDTO = userService.updateInfo(dto, userInfo);
            return ResponseEntity.ok().body(updateDTO);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }

    }

    // 카카오 로그인
    @GetMapping("/kakaologin")
    public ResponseEntity<?> kakaoLogin(String code) {
        log.info("코드 요청 들어옴?", code);
        LoginResponseDTO responseDTO = userService.kakaoService(code);
        log.info("responseData : {}", responseDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    // 네이버 로그인
    @GetMapping("/naverlogin")
    public ResponseEntity<?> naverLogin( @RequestParam (name = "code") String code,
                                         @RequestParam (name = "state") String state) throws UnsupportedEncodingException {
        log.info("왜 암것도 안찍혀?: {}, {}", code, state);
        LoginResponseDTO responseDTO = userService.naverService(code, state);
        log.info("responseData : {}", responseDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    // 구글
//    @RequestMapping(value = "/google", method = RequestMethod.GET)
//    public ResponseEntity<?> googleSignIn(@RequestParam(name = "code") String code) {
//
//        log.info("토큰 정보: {}", userService.googleLogin(code));
//        userService.googleLogin(code);
//
//        return ResponseEntity.ok().body(TokenUserInfo.builder()
//                .email().build());
//
//    }

    // 로그아웃 처리
    @GetMapping("/logout")
    public ResponseEntity<?> logout(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        log.info("/user/logout - GET! - user {}", userInfo.getUserId());
        String result = userService.logout(userInfo);

        return ResponseEntity.ok().body(result);
    }

    // 회원 탈퇴
    @DeleteMapping("/deleteuser")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal TokenUserInfo user) {

        log.info("/user/deleteuser - DELETE! - user {}",user);
        userService.deleteUser(user);

        return ResponseEntity.ok().build();
    }

    //스코어 등록 처리
    @PostMapping("/knowledges/quiz")
    public ResponseEntity<?> saveScore(@RequestParam int score,
                                       @AuthenticationPrincipal TokenUserInfo userInfo
                                       ) {
        try {
            UserSignUpResponseDTO userSignUpResponseDTO = userService.saveScore(score, userInfo);
            return ResponseEntity.ok().body(userSignUpResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }



    //마이페이지 내 스코어 요청 처리
    @GetMapping("/knowledges/quiz")
    public ResponseEntity<?> requestScore( @AuthenticationPrincipal TokenUserInfo userInfo) {

        try {
            UserSignUpResponseDTO userSignUpResponseDTO = userService.requestScore(userInfo);
            return ResponseEntity.ok().body(userSignUpResponseDTO);
        } catch (Exception e) {
            e.printStackTrace();
        return ResponseEntity.badRequest().body(e.getMessage());

        }

    }

}
