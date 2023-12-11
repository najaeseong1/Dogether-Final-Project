package com.ictedu.dogether.userapi.service;

import com.ictedu.dogether.userapi.dto.request.UserRequestSignUpDTO;
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
}
