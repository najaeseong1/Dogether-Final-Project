import { Button } from '@mui/material';
import React from 'react';
import './Join.scss';

const Join = () => {
  return (
    <div className="JoinTemplate1">
      <div className="JoinDogether">Dogether</div>
      <form className="JoinForm">
        <input
          type="text"
          id="id"
          placeholder="아이디를 입력해주세요"
        />
        <Button>아이디 중복확인</Button>
        <br />
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <br />
        <input
          type="password"
          id="password-check"
          placeholder="비밀번호를 확인."
        />
        <br />
        <input
          type="text"
          id="email"
          placeholder="이메일"
        />
        <Button>인증메일 발송</Button>
        <br />
        <input
          type="text"
          id="emailcheck"
          placeholder="메일 인증번호"
        />
        <Button>이메일 인증확인</Button>
        <br />
        <input
          type="text"
          id="name"
          placeholder="이름"
        />
        <br />
        <input
          type="text"
          id="phone"
          placeholder="전화번호"
        />
        <br />

        <button type="submit">회원가입</button>
        <button type="button">뒤로가기</button>
      </form>
    </div>
  );
};

export default Join;
