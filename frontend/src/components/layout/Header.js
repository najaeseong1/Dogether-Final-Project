import React from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };
  return (
    <>
      <div className='HeaderContainer1'>
        <ul>
          <li onClick={() => toLink('/user/login')}>로그인</li>
          <li onClick={() => toLink('/user/join')}>회원가입</li>
          <li onClick={() => toLink('/user/mypage')}>마이페이지</li>
        </ul>
      </div>
      <Link to={'/'}>
        <div className='Dogether'>Dogether</div>
      </Link>
      <div className='HeaderContainer2'>
        <ul>
          <li>
            <p onClick={() => toLink('/adoptionList')}>입양 게시판</p>
          </li>
          <li>
            <p onClick={() => toLink('/board')}>자유 게시판</p>
          </li>
          <li>
            <p onClick={() => toLink('/products')}>자체 제작 상품</p>
          </li>
          <li>
            <p onClick={() => toLink('/knowledges/knowledge')}>반려 백과</p>
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
