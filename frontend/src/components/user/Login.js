import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();

  const gojoin = () => {
    navigate("/user/Join")
  }

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 아이디와 비밀번호를 서버로 전송하고 토큰을 받아오는 비동기 함수 호출
    try {
      const token = await loginUser(id, password);
  
      // 토큰을 저장하고 다른 작업 수행
      // 예: 로그인 후에 사용자 정보를 가져오기 등
    } catch (error) {
      // 로그인 실패 시 에러 처리
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };
  
  const loginUser = async (id, password) => {
    // 서버로 아이디와 비밀번호를 전송하고 토큰을 받아오는 로직 구현
    // 예: fetch 또는 axios를 사용한 API 호출
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });
  
    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }
  
    const data = await response.json();
    return data.token;
  };

  

  return (
    <div className="wrapper">
    <div className="loginTemplate1">
      <div className="loginDogether">Dogether</div>
      <form>
        <input
          type="text"
          id="id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={handleIdChange}
        />
        <br />
        <input
          type="text"
          id="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="loginbtn">로그인</button>

        {/* 에러 메시지 표시 */}
        {error && <div className="error-message">{error}</div>}


          <div className="haha">
          <img className="kakaobtnimg"
            src="/img/loginPic/kakao_login_medium_narrow.png"
            alt="kakaoLogin"
            // onClick={}
          />
          
          <img className="naverbtnimg"
            src="/img/loginPic/btnG_완성형.png"
            alt="naverlogin"
            // onClick={}
          />
         </div>

          <div className="findaccount">
            <a className="findid" href="#">아이디 찾기&nbsp;&nbsp;</a> 
            <a className="findpass" href="#">&nbsp;&nbsp;비밀번호 찾기</a>
          </div>
          <a className="tojoin" onClick={gojoin}>회원가입 하기</a>
         
      </form>
    </div>
    </div>
  );
};

export default Login;
