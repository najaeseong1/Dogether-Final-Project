import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../global/utils/AuthContext';

const Header = () => {
  const toLink = (loc) => {
    redirection(loc);
  };
  const redirection = useNavigate();

  const { isLoggedIn, userName, onLogout } = useContext(AuthContext);

  // useEffect(() => {
  //   if (localStorage.getItem('isLoggedIn') === '1') {

  //   }
  // }, []);

  // 로그아웃 핸들러
  // const handleLogout = () => {
  //   localStorage.clear();
  //   setIsLoggedIn(false);
  //   alert('로그아웃 되었습니다.');
  //   redirection('/');
  // };

  return (
    <>
      <div className="HeaderContainer1">
        <ul>
          {!isLoggedIn && (
            <>
              <li onClick={() => toLink('/user/login')}>로그인</li>
              <li onClick={() => toLink('/user/join')}>회원가입</li>
              {isLoggedIn ? userName + '님' : '오늘'}의 할일
            </>
          )}
          {isLoggedIn && (
            <>
              <li onClick={() => toLink('/user/mypage')}>마이페이지</li>
              <li onClick={onLogout}>로그아 웃</li>
            </>
          )}
        </ul>
      </div>
      <Link to={'/'}>
        <div className="Dogether">Dogether</div>
      </Link>
      <div className="HeaderContainer2">
        <ul>
          <li>
            <p onClick={() => toLink('/adopt')}>입양 게시판</p>
          </li>
          <li>
            <p onClick={() => toLink('/board')}>자유 게시판</p>
          </li>
          <li>
            <p onClick={() => toLink('/product')}>자체 제작 상품</p>
          </li>
          <li>
            <p onClick={() => toLink('/knowledges/knowledge')}>반려 백과</p>
          </li>
          <li>
            <p onClick={() => toLink('/knowledges/quiz')}>반려 퀴즈</p>
          </li>
        </ul>
      </div>
      <div className="HeaderContainer3"></div>
    </>
  );
};

export default Header;
