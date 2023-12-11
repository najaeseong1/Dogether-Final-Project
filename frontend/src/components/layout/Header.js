import React from 'react';
import './Header.scss';
import Login from '../user/Login';
import { Route, Routes } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="HeaderContainer1">
        <Routes>
          <ul>
            <Route
              path="/user/login"
              element={<Login />}
            />
            <li>회원가입</li>
            <li>마이페이지</li>
          </ul>
        </Routes>
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
