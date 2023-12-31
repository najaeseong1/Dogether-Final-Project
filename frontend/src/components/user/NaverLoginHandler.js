import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../global/utils/AuthContext';
import { API_BASE_URL, USER } from '../../global/config/host-config';

const NaverLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  console.log(
    '사용자가 동의화면을 통해 필수정보 동의 후 Kakao 서버에서 redirect를 진행함!'
  );

  const REQUEST_URL = API_BASE_URL + USER;

  // URL에 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  console.log(
    '네이버 경로',
    REQUEST_URL + '/naverlogin?code=' + code + '&state=' + state
  );
  console.log('코드', code);
  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const naverLogin = async () => {
      const res = await fetch(
        REQUEST_URL + '/naverlogin?code=' + code + '&state=' + state
      );

      //const res = await fetch(REQUEST_URL + '/kakaologin?code=' + code);
      const { token, userName, userEmail, role } = await res.json(); // 서버에서 온 json 읽기

      console.log('res값', res);
      console.log('userName: ', userName);
      console.log('userEmail: ', userEmail);
      console.log('role: ', role);
      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, role, userEmail, userName);

      // 리다이렉트

      // const existEmail = localStorage.getItem('USER_EMAIL');

      if (userName === 'kakaoName') {
        redirection('/user/join');
      } else {
        redirection('/');
      }
    };

    naverLogin();
  }, []);

  // return <div>KakaoLoginHandler</div>;
};

export default NaverLoginHandler;

// 토큰값 있으면
