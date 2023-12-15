import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  // 클릭 시 로그인 페이지로
  const goLogin = () => {
    navigate("/Login")
  }

  // 클릭 시 회원가입 페이지로
  const goJoin = () => {
    navigate("/Join")
  }

  // 클릭 시 백과 페이지로 
  const goKnowledge = () => {
    navigate("/Knowledge")
  }
  
  // 클릭 시 입양 게시판
  const goAdoptionList = () => {
    navigate("/AdoptionList")
  }

  
  return (
    <>
      <div className='HeaderContainer1'>
        <ul>
          <li onClick={goLogin}>로그인</li>
          <li onClick={goJoin}>회원가입</li>
          <li>마이페이지</li>
        </ul>
      </div>
      <div className='Dogether'>Dogether</div>
      <div className='HeaderContainer2'>
        <ul>
          <li>
            <p onClick={goAdoptionList}>입양 게시판</p>
          </li>
          <li>
            <p>자유 게시판</p>
          </li>
          <li>
            <p>자체 제작 상품</p>
          </li>
          <li>
            <p onClick={goKnowledge}>반려 백과</p>
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
