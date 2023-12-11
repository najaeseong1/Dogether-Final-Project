package com.ictedu.dogether.userapi.api;

import com.ictedu.dogether.userapi.dto.request.LoginRequestDTO;
import com.ictedu.dogether.userapi.dto.request.UserRequestSignUpDTO;
import com.ictedu.dogether.userapi.dto.response.LoginResponseDTO;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
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

    // 아이디 중복 체크
    @GetMapping("/checkId")
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

//    @PostMapping("/signin")
//    public ResponseEntity<?> signIn(
//            @Validated @RequestBody LoginRequestDTO dto
//    ) {
//        try {
//            LoginResponseDTO responseDTO
//                    = userService.authenticate(dto);
//
//            return ResponseEntity.ok().body(responseDTO);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest()
//                    .body(e.getMessage());
//        }
//    }




}
