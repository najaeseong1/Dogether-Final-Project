package com.ictedu.dogether.userapi.service;

import com.ictedu.dogether.auth.TokenProvider;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.dto.request.LoginRequestDTO;
import com.ictedu.dogether.userapi.dto.request.UserRequestSignUpDTO;
import com.ictedu.dogether.userapi.dto.request.UserUpdateRequestDTO;
import com.ictedu.dogether.userapi.dto.response.LoginResponseDTO;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원 가입 처리
    public UserSignUpResponseDTO create(
            final UserRequestSignUpDTO dto
    ) {
        String userId = dto.getUserId();

        if(isDuplicate(userId)) {
            log.warn("아이디가 중복되었습니다. - {}", userId);
            throw new RuntimeException("중복된 아이디 입니다.");
        }

        // 패스워드 인코딩
        String encoded = passwordEncoder.encode(dto.getUserPass());
        dto.setUserPass(encoded);

        // dto를 User Entity로 변환해서 저장
        User saved = userRepository.save(dto.toEntity());
        log.info("회원 가입 정상 수행됨! - saved user - {}", saved);

        return new UserSignUpResponseDTO(saved);

    }

    public boolean isDuplicate(String userId) {
        return userRepository.existsById(userId);
    }

    public LoginResponseDTO authenticate(final LoginRequestDTO dto) {

        // 아이디 통해 회원 정보 조회
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(
                        () -> new RuntimeException("가입된 회원이 아닙니다.")
                );

        // 패스워드 검증
        String rawPassword = dto.getUserPass(); // 입력한 비번
        String encodedPassword = user.getUserPass(); // DB에 저장된 암호화된 비번

        if(!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        log.info("{}님 로그인 성공!", user.getUserName());

        // 로그인 성공 후에 클라이언트에게 뭘 리턴할 것인가???
        // -> JWT를 클라이언트에게 발급해 주어야 한다!
        String token = tokenProvider.createToken(user);

        return new LoginResponseDTO(user, token);

    }

    //개인정보 변경 페이지
    public  UserSignUpResponseDTO getUserInfo(TokenUserInfo userInfo) {
        User finduser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );
        return new UserSignUpResponseDTO(finduser);

    }

    //개인정보 변경 수정 페이지
    public UserSignUpResponseDTO updateInfo(UserUpdateRequestDTO dto, TokenUserInfo userInfo) {

        User findUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("동일한 회원이 아닙니다.")
        );
        findUser.setUserPhone(dto.getUserPhone());
        findUser.setUserPass(dto.getUserPass());
        findUser.setPostAddr(dto.getPostAddr());

        User saveInfo = userRepository.save(findUser);

        //dto 재활용함
        return new UserSignUpResponseDTO(saveInfo);

    }

    //사용자의 정보 찾기
    public UserSignUpResponseDTO getAdoptInfo(String userId) {
        User targetUser = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("회원이 아닙니다.")
        );
        return new UserSignUpResponseDTO(targetUser); //dto 재활용함


    }
}
