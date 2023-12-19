package com.ictedu.dogether.userapi.api;

import com.ictedu.dogether.userapi.dto.request.EmailRequestDto;
import com.ictedu.dogether.userapi.dto.request.FindInfoRequestDTO;
import com.ictedu.dogether.userapi.service.MailSendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Transactional
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class MailController {

    private final MailSendService mailService;

    // 회원가입 인증번호 발송
    @PostMapping("/mailSend")
    public String mailSend(@RequestBody @Valid EmailRequestDto dto){
        log.info("메일 전송 요청!!!!-{}", dto.getEmail());
        return mailService.joinEmail(dto.getEmail());
    }

    // 아이디 찾기
    @PostMapping("/findId")
    public String findId(@RequestBody @Valid FindInfoRequestDTO dto){
        log.info("아이디 찾기 요청!!!!-{}, {}", dto.getUserName(), dto.getUserEmail());
        return mailService.findIdEmail(dto.getUserName(), dto.getUserEmail());
    }

    @PostMapping("/findPassword")
    public String findPassword(@RequestBody @Valid FindInfoRequestDTO dto){
        log.info("비밀번호 찾기 요청!!!!-{}, {}", dto.getUserId(), dto.getUserEmail());
        return mailService.findPasswordEmail(dto.getUserId(), dto.getUserEmail());
    }



}
