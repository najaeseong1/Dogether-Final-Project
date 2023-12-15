import React from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const redirection = useNavigate();

  //
  const toBoard = () => {
    redirection('/board');
  };
  const toproduct = () => {
    redirection('/product');
  };
  const toMyPage = () => {
    redirection('/user/mypage');
  };
  const toLogin = () => {
    redirection('/user/login');
  };
  const toJoin = () => {
    redirection('/user/join');
  };
  return (
    <>
      <div className='HeaderContainer1'>
        <ul>
          <li onClick={toLogin}>로그인</li>
          <li onClick={toJoin}>회원가입</li>
          <li onClick={toMyPage}>마이페이지</li>
        </ul>
      </div>
      <Link
        to={'/'}
        style={{ textDecoration: 'none' }}
      >
        <div className='Dogether'>Dogether</div>
      </Link>
      <div className='HeaderContainer2'>
        <ul>
          <li>
            <p>입양 게시판</p>
          </li>
          <li>
            <p onClick={toBoard}>자유 게시판</p>
          </li>
          <li>
            <p onClick={toproduct}>자체 제작 상품 </p>
          </li>
          <li>
            <p>반려 백과</p>
          </li>
          <li>
            <p>반려 퀴즈</p>
          </li>
        </ul>
      </div>
      <div className='HeaderContainer3'></div>
    </>
  );
};

export default Header;
