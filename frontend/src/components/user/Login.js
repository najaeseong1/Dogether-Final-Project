import React, { useContext, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../global/utils/AuthContext.js';
import { API_BASE_URL } from '../../global/config/host-config.js';
import { KAKAO_AUTH_URL } from '../../global/kakaoAuth.js';

const Login = () => {
  const redirection = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const toLink = (loc) => {
    navigate(loc);
  };

  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');

  // 서버에 로그인 요청
  const fetchLogin = async () => {
    const $userId = document.getElementById('id');
    const $userPass = document.getElementById('password');

    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: $userId.value,
          userPass: $userPass.value,
        }),
      });

      if (res.status === 200) {
        const { token } = await res.json();

        localStorage.setItem('ACCESS_TOKEN', token);
        redirection('/');
      }
      if (res.status === 400) {
        const text = await res.text();
        alert(text);
        console.log('회원미존재');
        return;
      }

      const { token, role } = await res.json();

      // 위에있는 await 가 실행되기 전까지는 실행되지 않음,
      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, role);

      // 로그인이 성공하면 원하는 동작 수행
      redirection('/');
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  // 로그인
  const handleLogin = (e) => {
    e.preventDefault();

    // 로그인 요청하기
    fetchLogin();
  };

  return (
    <div className="wrapper">
      <div className="loginTemplate1">
        <div className="loginDogether">Dogether</div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="id"
            name="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
          />
          <button
            type="submit"
            className="loginbtn"
          >
            로그인
          </button>

          <div className="haha">
            <img
              className="kakaobtnimg"
              src="/img/kakaoLoginBtn.png"
              alt="kakaoLogin"
              onClick={() => {
                window.location.href = KAKAO_AUTH_URL;
              }}
            />

            <img
              className="naverbtnimg"
              src="/img/naverLoginBtn.png"
              alt="naverlogin"
            />
          </div>

          <div className="account">
            <span
              className="findid"
              onClick={() => toLink('/user/findid')}
            >
              아이디 찾기
            </span>
            <span
              className="findpass"
              onClick={() => toLink('/user/findpassword')}
            >
              비밀번호 찾기
            </span>
            <span
              className="tojoin"
              onClick={() => toLink('/user/join')}
            >
              회원가입 하기
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
