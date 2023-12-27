import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../global/utils/AuthContext';
import { API_BASE_URL, USER } from '../../global/config/host-config';

const Header = () => {
  const redirection = useNavigate();
  const toLink = (loc) => {
    redirection(loc);
  };

  const { isLoggedIn, onLogout } = useContext(AuthContext);
  // 로그아웃 핸들러
  const logoutHandler = async () => {
    const res = await fetch(`${API_BASE_URL}${USER}/logout`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    onLogout();
    redirection('/');
  };

  // 로그인 상태가 바뀔때마다
  useEffect(() => {
    console.log('상태변경', isLoggedIn);
  }, [isLoggedIn]); // 로그인 상태가 바뀔때마다

  return (
    <>
      <div className='HeaderContainer1'>
        <ul>
          {isLoggedIn ? (
            <>
              <li onClick={() => toLink('/user/mypage')}>마이페이지</li>
              <li onClick={logoutHandler}>로그아웃</li>
            </>
          ) : (
            <>
              <li onClick={() => toLink('/user/login')}>로그인</li>
              <li onClick={() => toLink('/user/join')}>회원가입</li>
            </>
          )}
        </ul>
      </div>
      <Link to={'/'}>
        <div className='Dogether'>Dogether</div>
      </Link>
      <div className='HeaderContainer2'>
        <ul>
          <li>
            <p onClick={() => toLink('/adopt')}>입양 게시판</p>
          </li>
          <li>
            <p onClick={() => toLink('/board')}>자유 게시판</p>
          </li>

          <li>
            <p onClick={() => toLink('/knowledges/knowledge')}>반려 백과</p>
          </li>
          <li>
            <p onClick={() => toLink('/product')}>반려 상품</p>
          </li>
          <li>
            <p onClick={() => toLink('/knowledges/quiz')}>반려 퀴즈</p>
          </li>
        </ul>
      </div>
      <div className='HeaderContainer3'></div>
    </>
  );
};

export default Header;
