package com.ictedu.dogether.userapi.service;

import com.ictedu.dogether.auth.TokenProvider;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.dto.request.EmailRequestDTO;
import com.ictedu.dogether.userapi.dto.request.LoginRequestDTO;
import com.ictedu.dogether.userapi.dto.request.UserRequestSignUpDTO;
import com.ictedu.dogether.userapi.dto.request.UserUpdateRequestDTO;
import com.ictedu.dogether.userapi.dto.response.KakaoUserDTO;
import com.ictedu.dogether.userapi.dto.response.LoginResponseDTO;
import com.ictedu.dogether.userapi.dto.response.UserSignUpResponseDTO;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${kakao.client_id}")
    private String KAKAO_CLIENT_ID;
    @Value("${kakao.redirect_url}")
    private String KAKAO_REDIRECT_URI;
    @Value("${kakao.client_secret}")
    private String KAKAO_CLIENT_SECRET;

    // 회원 가입 처리
    public UserSignUpResponseDTO create(final UserRequestSignUpDTO dto) {

        String userId = dto.getUserId();

        if (isDuplicate(userId)) {
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

    // 아이디 중복 검사
    public boolean isDuplicate(String userId) {
        return userRepository.existsById(userId);
    }

    // 로그인 후 토큰 발급
    public LoginResponseDTO authenticate(final LoginRequestDTO dto) {

        // 아이디 통해 회원 정보 조회
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(
                        () -> new RuntimeException("가입된 회원이 아닙니다."));

        // 패스워드 검증
        String rawPassword = dto.getUserPass(); // 입력한 비번
        String encodedPassword = user.getUserPass(); // DB에 저장된 암호화된 비번

        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        log.info("{}님 로그인 성공!", user.getUserName());

        // 로그인 성공 후에 클라이언트에게 뭘 리턴할 것인가???
        // -> JWT를 클라이언트에게 발급해 주어야 한다!
        String token = tokenProvider.createToken(user);

        return new LoginResponseDTO(user, token);

    }

    // 개인정보 변경 페이지
    public UserSignUpResponseDTO getUserInfo(TokenUserInfo userInfo) {
        User finduser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다."));
        return new UserSignUpResponseDTO(finduser);

    }

    // 개인정보 변경 수정 페이지
    public UserSignUpResponseDTO updateInfo(UserUpdateRequestDTO dto, TokenUserInfo userInfo) {

        User findUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("동일한 회원이 아닙니다."));
        findUser.setUserPhone(dto.getUserPhone());
        findUser.setUserPass(dto.getUserPass());
        findUser.setPostAddr(dto.getPostAddr());

        User saveInfo = userRepository.save(findUser);

        // dto 재활용함
        return new UserSignUpResponseDTO(saveInfo);

    }

    // email로 아이디를 찾아 리턴
    public String getUserId(EmailRequestDTO dto) {
        User user = userRepository.findByUserEmail(dto.getEmail());
        return user.getUserId();
    }

    public void getUserPass(LoginRequestDTO dto) {

        // 아이디 통해 회원 정보 조회
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(
                        () -> new RuntimeException("가입된 회원이 아닙니다."));

        // 패스워드 입력
        String rawPassword = dto.getUserPass(); // 입력한 비번
        // 패스워드 인코딩
        String encoded = passwordEncoder.encode(rawPassword);

        user.setUserPass(encoded); // 비번 변경
        userRepository.save(user);
    }

    // 사용자의 정보 찾기
    public UserSignUpResponseDTO getAdoptInfo(String userId) {
        User targetUser = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("회원이 아닙니다."));
        return new UserSignUpResponseDTO(targetUser); // dto 재활용함

    }

    public LoginResponseDTO kakaoService(final String code) {
            log.info("code -{}", code);
        // 인가코드를 통해 토큰 발급받기
        Map<String, Object> responseData = getKakaoAccessToken(code);
        log.info("kakaoToken: {}", responseData.get("access_token"));

        // 토큰을 통해 사용자 정보 가져오기
        KakaoUserDTO dto = getKakaoUserInfo((String)responseData.get("access_token"));

        // 일회성 로그인으로 처리 -> dto를 바로 화면단으로 리턴
        // 회원가입 처리 -> 이메일 중복 검사 진행 -> 자체 jwt를 생성해서 토큰을 화면단에 리턴.
        // -> 화면단에서는 적절한 url을 선택하여 redirect를 진행.

        if(!isDuplicate(dto.getKakaoAccount().getEmail())) {
            log.info("dto이메일, -{}",dto.getKakaoAccount().getEmail() );
            // 이메일이 중복되지 않았다 -> 이전에 로그인 한 적이 없음 -> DB에 데이터를 세팅
            User saved = userRepository.save(dto.toEntity((String)responseData.get("access_token")));
        }
        // 이메일이 중복됐다? -> 이전에 로그인 한 적이 있다. -> DB에 데이터를 또 넣을 필요는 없다.
        User foundUser = userRepository.findByUserEmail(dto.getKakaoAccount().getEmail());

        String token = tokenProvider.createToken(foundUser);

        foundUser.setAccessToken((String)responseData.get("access_token"));
        userRepository.save(foundUser);


        return new LoginResponseDTO(foundUser, token);

    }

    private KakaoUserDTO getKakaoUserInfo(String accessToken) {
            log.info("엑세스토큰 -{}", accessToken);
        // 요청 uri
        String requestUri = "https://kapi.kakao.com/v2/user/me";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 보내기
        RestTemplate template = new RestTemplate();
        ResponseEntity<KakaoUserDTO> responseEntity
                = template.exchange(requestUri, HttpMethod.GET, new HttpEntity<>(headers), KakaoUserDTO.class);
        log.info("responseEntity-{}", responseEntity);
        // 응답 바디 읽기
        KakaoUserDTO responseData = responseEntity.getBody();
        log.info("user profile: {}", responseData);

        return responseData;
    }

    private Map<String, Object> getKakaoAccessToken(String code) {

        // 요청 uri
        String requestUri = "https://kauth.kakao.com/oauth/token";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 바디(파라미터) 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); // 카카오 공식 문서 기준 값으로 세팅
        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 디벨로퍼 REST API 키
        params.add("redirect_uri", KAKAO_REDIRECT_URI); // 카카오 디벨로퍼 등록된 redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 전달받은 코드값
        params.add("client_secret", KAKAO_CLIENT_SECRET); // 카카오 디벨로퍼 client secret(활성화 시 추가해 줘야 함)

        // 헤더와 바디 정보를 합치기 위해 HttpEntity 객체 생성
        HttpEntity<Object> requestEntity = new HttpEntity<>(params, headers);

        // 카카오 서버로 POST 통신
        RestTemplate template = new RestTemplate();

        // 통신을 보내면서 응답데이터를 리턴
        // param1: 요청 url
        // param2: 요청 메서드 (전송 방식)
        // param3: 헤더와 요청 파라미터정보 엔터티
        // param4: 응답 데이터를 받을 객체의` 타입 (ex: dto, map)
        // 만약 구조가 복잡한 경우에는 응답 데이터 타입을 String으로 받아서 JSON-simple 라이브러리로 직접 해체.
        ResponseEntity<Map> responseEntity
                = template.exchange(requestUri, HttpMethod.POST, requestEntity, Map.class);

        // 응답 데이터에서 필요한 정보를 가져오기
        Map<String, Object> responseData = (Map<String, Object>)responseEntity.getBody();
        log.info("토큰 요청 응답 데이터: {}", responseData);

        return responseData;
    }

    public String logout(TokenUserInfo userInfo) {
        User foundUser = userRepository.findById(userInfo.getUserId())
                .orElseThrow();

        String accessToken = foundUser.getAccessToken();
        if(accessToken != null) {
            String reqUri = "https://kapi.kakao.com/v1/user/logout";
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);

            RestTemplate template = new RestTemplate();
            ResponseEntity<String> responseData
                    = template.exchange(reqUri, HttpMethod.POST, new HttpEntity<>(headers), String.class);
            return responseData.getBody();
        }
        return null;
    }


}
