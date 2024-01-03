package com.ictedu.dogether.userapi.api;

import com.ictedu.dogether.userapi.dto.request.EmailRequestDTO;
import com.ictedu.dogether.userapi.dto.response.CheckResponseDTO;
import com.ictedu.dogether.userapi.service.MailSendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Transactional
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin
public class MailController {

    private final MailSendService mailService;

    // 회원가입 인증번호 발송
    @PostMapping("/checkmailsend")
    public CheckResponseDTO mailSend(@RequestBody @Valid EmailRequestDTO dto){
        log.info("메일 전송 요청!!!!-{}", dto.getEmail());

        String code = mailService.joinCheckEmail(dto.getEmail());

        CheckResponseDTO checkCode = new CheckResponseDTO(code);
        return checkCode;
    }



}
