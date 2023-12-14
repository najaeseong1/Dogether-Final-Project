import React from 'react';
import './Login.scss';
const Login = () => {
  return (
    <div className="loginTemplate1">
      <div className="loginDogether">Dogether</div>
      <form>
        <input
          type="text"
          id="id"
          placeholder="아이디를 입력해주세요"
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
