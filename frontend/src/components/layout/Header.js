import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <>
      <div className='HeaderContainer1'>
        <ul>
          <li>로그인</li>
          <li>회원가입</li>
          <li>마이페이지</li>
        </ul>
      </div>
      <div className='Dogether'>Dogether</div>
      <div className='HeaderContainer2'>
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
      <div className='HeaderContainer3'></div>
    </>
  );
};

export default Header;
