import React from 'react';
import './PageNotFound.scss';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
  const redirection = useNavigate();
  const ToMainhome = () => {
    redirection('/');
  };

  return (
    <div className='error-container'>
      <div className='Dogether'>Dogether</div>
      <h1>400 </h1>
      <p>죄송합니다.페이지를 찾을 수 없어요.</p>
      <span>
        요청하신 페이지가 제거되었거나, 이름이 변경되었거나 잘못된 요청입니다.
      </span>
      <br></br>
      <button className='Tomain' onClick={ToMainhome}>
        메인홈으로
      </button>
    </div>
  );
};

export default PageNotFound;
