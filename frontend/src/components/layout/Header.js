import React from 'react';
import './Header.scss';
import Login from '../user/Login';
import { Link, Route, Routes } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="HeaderContainer1">
        <ul>
          <li>
            <Link to="/user/login">로그인</Link>
          </li>
          <li>
            <Link to="/user/Join">회원가입</Link>
          </li>
          <li>마이페이지</li>
        </ul>
      </div>
      <div className="Dogether">Dogether</div>
      <div className="HeaderContainer2">
        <ul>
          <li>
            <p>입양 게시판</p>
          </li>
          <li>
            <p>자유 게시판</p>
          </li>
          <li>
            <p>자체 제작 상품</p>
          </li>
          <li>
            <p>반려 백과</p>
          </li>

          <li>
            <p>반려 퀴즈</p>
          </li>
        </ul>
      </div>
      <div className="HeaderContainer3"></div>
    </>
  );
};

export default Header;
