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

    //개인정보 변경 페이지 요청 (비번 변경, 전화번호, 주소, 결제수단 ->  변경가능)
    @PostMapping("/modify")
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
    @PatchMapping("/modify")
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



}
