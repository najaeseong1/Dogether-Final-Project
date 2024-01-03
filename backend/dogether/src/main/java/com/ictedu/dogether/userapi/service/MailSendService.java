package com.ictedu.dogether.userapi.service;

import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
@ToString
public class MailSendService {

    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private int authNumber;

    //임의의 6자리 양수를 반환합니다.
    public void makeRandomNumber() {
        Random r = new Random();
        String randomNumber = "";
        for(int i = 0; i < 6; i++) {
            randomNumber += Integer.toString(r.nextInt(10));
        }

        authNumber = Integer.parseInt(randomNumber);
    }


    // 인증번호만 보내는 메세지
    public String checkEmail(String email) {
        makeRandomNumber();
        String setFrom = "hunmo089300@naver.com"; // email-config에 설정한 자신의 이메일 주소를 입력
        String toMail = email;
        String title = "[DOGETHER] 인증 메일입니다."; // 이메일 제목
        String content =
                "DOGETHER 인증 메일입니다." + 	//html 형식으로 작성 !
                        "<br><br>" +
                        "인증 번호는 " + authNumber + "입니다." +
                        "<br>" +
                        "인증번호를 정확히 입력해주세요"; //이메일 내용 삽입
        mailSend(setFrom, toMail, title, content);
        return Integer.toString(authNumber);
    }

    public String checkNum(String email) {
        makeRandomNumber();
        String toMail = email;

        return Integer.toString(authNumber);
    }

    // 회원가입 인증메세지
    public String joinCheckEmail(String email) {
        makeRandomNumber();
        String setFrom = "hunmo089300@naver.com"; // email-config에 설정한 자신의 이메일 주소를 입력
        String toMail = email;
        String title = "[DOGETHER] 회원가입 인증 메일입니다."; // 이메일 제목
        String content =
                "DOGETHER 저희와 함께해 주셔서 감사합니다." + 	//html 형식으로 작성 !
                        "<br><br>" +
                        "인증 번호는 " + authNumber + "입니다." +
                        "<br>" +
                        "인증번호를 정확히 입력해주세요"; //이메일 내용 삽입
        mailSend(setFrom, toMail, title, content);
        return Integer.toString(authNumber);
    }

    //이메일 전송
    public void mailSend(String setFrom, String toMail, String title, String content) {
        MimeMessage message = mailSender.createMimeMessage();//JavaMailSender 객체를 사용하여 MimeMessage 객체를 생성
        log.info("메일전송 요청옴 -{}", message);
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");//이메일 메시지와 관련된 설정을 수행합니다.
            // true를 전달하여 multipart 형식의 메시지를 지원하고, "utf-8"을 전달하여 문자 인코딩을 설정
            helper.setFrom(setFrom);//이메일의 발신자 주소 설정
            helper.setTo(toMail);//이메일의 수신자 주소 설정
            helper.setSubject(title);//이메일의 제목을 설정
            helper.setText(content,true);//이메일의 내용 설정 두 번째 매개 변수에 true를 설정하여 html 설정으로한다.
            mailSender.send(message);
        } catch (MessagingException e) {//이메일 서버에 연결할 수 없거나, 잘못된 이메일 주소를 사용하거나, 인증 오류가 발생하는 등 오류
            // 이러한 경우 MessagingException이 발생
            e.printStackTrace();//e.printStackTrace()는 예외를 기본 오류 스트림에 출력하는 메서드
        }

    }




}
