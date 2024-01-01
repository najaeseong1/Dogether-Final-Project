import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { API_BASE_URL, USER } from '../config/host-config';

const NaverLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  console.log(
    '사용자가 동의화면을 통해 필수정보 동의 후 Naver 서버에서 redirect를 진행함!'
  );

  const REQUEST_URL = API_BASE_URL + USER;

  // URL에 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const NaverLogin = async () => {
      const res = await fetch(REQUEST_URL + '/Naverlogin?code=' + code);

      const { token, userName, userEmail, role } = await res.json(); // 서버에서 온 json 읽기

      console.log('res값', res);
      console.log('userName: ', userName);
      console.log('userEmail: ', userEmail);
      console.log('role: ', role);
      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, role, userEmail, userName);

      // 리다이렉트
      redirection('/user/join');
    };

    NaverLogin();
  }, []);

  return <div>NaverLoginHandler</div>;
};

export default NaverLoginHandler;
