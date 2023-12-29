import React, { useContext, useEffect } from 'react';
import './AdminMain.scss';
import { useNavigate } from 'react-router-dom';

const AdminMain = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };

  const adoptionList = [
    {
      id: 1,
      time: '2023-12-22 10:00',
      writer: '춘식이',
      product: '멍멍이 사료',
      addr: '인천 광역시 중구 운서동 영종대로 27번길 40 ',
    },
    {
      id: 2,
      time: '2023-12-22 11:30',
      writer: '김철수',
      addr: '서울 마포구 어쩌구대로',
    },
    {
      id: 2,
      time: '2023-12-22 11:30',
      writer: '김철수',
      addr: '서울 마포구 어쩌구대로',
    },
  ];

  return (
    <>
      <div className='mainmain'>
        <div className='management'>
          <div className='title-management'>
            <p className='logo'>Dogether</p>
          </div>

          <div className='profile'>여기는 관리자 계정입니다.</div>
          <div className='header-left'>
            <ul className='left-menu'>
              <button onClick={() => toLink('/ordermanagement')}>
                주문관리
              </button>
              <button onClick={() => toLink('/adoptionmanagement')}>
                입양관리
              </button>
              <li className='left-tap'>접수대기</li>
              <li className='left-tap'>처리중 / 배달완료 </li>
              <li className='left-tap'>주문취소</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMain;
